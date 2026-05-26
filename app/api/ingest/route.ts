import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function POST(request: Request) {
  try {
    // 1. 【安全校验层】防止恶意用户调用接口消耗你的大模型 Token
    const urlObj = new URL(request.url);
    const cronSecret =
      urlObj.searchParams.get('secret') || request.headers.get('Authorization');

    // 在 Vercel 部署后，系统会自动比对内部安全密钥
    if (
      process.env.NODE_ENV === 'production' &&
      cronSecret !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json(
        { error: 'Unauthorized CRON call' },
        { status: 401 }
      );
    }

    // 2. 【原始数据抓取层】
    // 💡 行业顶级实战：由于各交易所的官方公告有标准的 RSS/API 流，这里直接对接 2026 聚合公开数据源
    const newsResponse = await fetch(
      'https://cryptopanic.com/api/v1/posts/?auth_token=PUBLIC&public=true'
    );
    const newsData = await newsResponse.json();

    if (!newsData.results || newsData.results.length === 0) {
      return NextResponse.json({
        success: true,
        message: '今日币圈市场无重大波动更新',
      });
    }

    // 筛选出属于四大竞品（Binance, OKX, Bybit, Coinbase）的相关前沿线索
    const targetKeywords = ['binance', 'okx', 'bybit', 'coinbase'];
    const filteredFeeds = newsData.results
      .filter((post: any) =>
        targetKeywords.some((keyword) =>
          post.title.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 3); // 每天半夜精选最重磅的 3 条进行深度研判

    if (filteredFeeds.length === 0) {
      return NextResponse.json({
        success: true,
        message: '过去24h四大竞品无重大底层动作',
      });
    }

    // 3. 【AI 智库推理层】循环将原文本丢给大模型进行咨询报告级结构化研究
    for (const feed of filteredFeeds) {
      // 判定这条动态属于哪个竞品
      const matchedComp =
        targetKeywords.find((k) => feed.title.toLowerCase().includes(k)) ||
        'Binance';
      const compName =
        matchedComp.toUpperCase() === 'BINANCE'
          ? 'Binance'
          : matchedComp.toUpperCase() === 'OKX'
          ? 'OKX'
          : matchedComp.charAt(0).toUpperCase() + matchedComp.slice(1);

      // 判定栏目归类
      let category = 'Product';
      if (
        feed.title.toLowerCase().includes('sponsor') ||
        feed.title.toLowerCase().includes('camp')
      )
        category = 'Sponsorship';
      if (
        feed.title.toLowerCase().includes('ceo') ||
        feed.title.toLowerCase().includes('legal')
      )
        category = 'PR';

      // 调用大模型 (默认支持 OpenAI 规范，如使用 DeepSeek 只需更换 url 即可)
      const aiResponse = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini', // 使用高性价比的专属模型
            response_format: { type: 'json_object' }, // 强制让 GPT 吐出标准 JSON
            messages: [
              {
                role: 'system',
                content: `你是一个呆在 Bitget 内部、拥有 10 年经验的顶级 Web3 首席营销科学家。
              请阅读输入的币圈竞品原生线索，站在保护 Bitget 市场份额的角度，深度提炼并输出以下结构的 JSON 对象（必须用纯中文回答）：
              {
                "refined_title": "提炼出不超过30字的硬核中文标题",
                "why_matters": "用一句话精准指出这个动作对行业或 Bitget 的实质性杀伤力或重大意义",
                "viral_logic": "从用户心理学、流量机制或利益驱动角度，拆解它为什么会引发广泛关注或使用",
                "bitget_action": "给出1条极具可操作性、具体的 Bitget 应对战术、防御策略或可以直接复制的业务线索建议"
              }`,
              },
              { role: 'user', content: feed.title },
            ],
          }),
        }
      );

      const aiData = await aiResponse.json();
      const payload = JSON.parse(aiData.choices[0].message.content);

      // 4. 【数据清洗落地层】将大模型提炼完的真金白银策略砸进 Supabase 数据库
      await supabase.from('competitor_matrix').insert([
        {
          competitor_name: compName,
          category: category,
          title: payload.refined_title,
          time_string: 'Just now',
          is_highlight: feed.votes?.important > 5 || false,
          why_matters: payload.why_matters,
          viral_logic: payload.viral_logic,
          bitget_action: payload.bitget_action,
          sources: [{ platform: 'News Source', url: feed.url }],
        },
      ]);
    }

    return NextResponse.json({
      success: true,
      processed_count: filteredFeeds.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
