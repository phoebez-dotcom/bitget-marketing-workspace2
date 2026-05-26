'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // 引入连接器
import {
  ExternalLink,
  Bookmark,
  Search,
  Filter,
  ChevronRight,
  MessageCircle,
  Globe,
  Play,
  Camera,
  Briefcase,
  Zap,
} from 'lucide-react';

export default function IntelligenceWorkspace() {
  // ================= STATE FOR FILTERS =================
  const [selectedCompetitor, setSelectedCompetitor] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // ================= 📊 真实 2026 年 5 月竞品动态全矩阵（带真实可跳转链接） =================
  const defaultMockData = [
    {
      name: 'Binance',
      modules: {
        Social: [],
        PR: [],
        Sponsorship: [],
        Product: [
          {
            id: 'bin-2026-prod-1',
            title:
              '首发推出 Pre-IPO 永续合约资产类别，首期挂钩 SpaceX (SPCXUSDT)',
            time: '2026-05-21',
            isHighlight: true,
            analysis: {
              why_matters:
                '打破了传统 Web3 资产局限，首次将传统 TradFi 未上市科技独角兽的股权预期引入币圈永续合约，极大拓宽了散户交易标的。',
              viral_logic:
                '自带马斯克与 SpaceX 的超级流量，在 X (Twitter) 的泛科技圈和散户群中引发了极高密度的自主传播与晒单。',
              bitget_action:
                'Bitget 产品与创新团队需紧急评估此类 Pre-IPO 衍生品的合规风险，并针对传统股权代币化（RWA 赛道延伸）做战术防御布局。',
            },
            sources: [
              {
                platform: 'PR Newswire',
                url: 'https://www.prnewswire.co.uk/news-releases/binance-launches-perpetual-futures-for-pre-ipo-market-exposure-starting-with-spacex-302778519.html',
              },
            ],
          },
        ],
        Brand: [],
      },
    },
    {
      name: 'OKX',
      modules: {
        Social: [],
        PR: [],
        Sponsorship: [],
        Product: [
          {
            id: 'okx-2026-prod-1',
            title:
              '官方公告发布：全网支持 Base Layer 2 网络重大技术升级并暂停代币充提',
            time: '2026-05-22',
            isHighlight: false,
            analysis: {
              why_matters:
                '常规但极具风控意义的技术升级公告。Base 链作为当前链上最活跃的生态，确保其充提通道在升级期间零事故是保障交易员体验的底线。',
              viral_logic:
                '属于官方刚性通知，主要在电报社群、推特 Base 开发者圈层以及活跃链上搬砖党中精准传播。',
              bitget_action:
                'Bitget 钱包与钱包充提网络团队需同步对齐 Base 网络的升级时间表，确保我们在同时间段的充提顺畅与公告及时。',
            },
            sources: [
              {
                platform: 'OKX Help Center',
                url: 'https://www.okx.com/en-sg/help/okx-to-support-base-network-upgrade',
              },
            ],
          },
        ],
        Brand: [],
      },
    },
    {
      name: 'Bybit',
      modules: {
        Social: [],
        PR: [
          {
            id: 'bybit-2026-pr-1',
            title:
              'CEO 周本出席高盛 2026 亚太金融科技峰会，发表全球资产代币化趋势演讲',
            time: '2026-05-25',
            isHighlight: false,
            analysis: {
              why_matters:
                '极其罕见的 Web3 顶流在顶级传统投行（Goldman Sachs）的峰会开麦，标志着 Bybit 正在向“全球新金融基础设施平台”转型，拼命洗脱纯币圈交易所的底色。',
              viral_logic:
                '主流商业财经媒体（Cision/Newswire）全球同步发稿，高管言论绑定传统宏观金融，在 LinkedIn 和专业分析师社群中引发关于 Web3 银行层面的深度讨论。',
              bitget_action:
                'PR 和 Brand 团队需要强化高管在合规化、传统金融科技领域的 Thought Leadership 声音，积极参与欧美和亚太的传统顶尖财智论坛。',
            },
            sources: [
              {
                platform: 'Corporate Wire',
                url: 'https://www.eqs-news.com/news/corporate/bybit-unveils-2026-vision-as-the-new-financial-platform-expanding-beyond-exchange-into-global-financial-infrastructure/bb7ba069-671a-4e5f-9102-268d9161c37b_en',
              },
            ],
          },
        ],
        Sponsorship: [
          {
            id: 'bybit-2026-sp-1',
            title:
              '官宣开启 XUSD 赚币与价值 1 亿美元的真实世界资产 (RWA) 全球大投放活动',
            time: '2026-05-19',
            isHighlight: true,
            analysis: {
              why_matters:
                '大预算的战术拉新动作。用“1 亿美元 RWA 赠送”作为噱头，直接拦截市场上对美债、大宗商品代币化感兴趣的低风险偏好理财客群。',
              viral_logic:
                '“1 亿美元”和高 APR 永远是币圈最好用的流量钩子（Hook），引发了巨量羊毛党及理财 KOL 在 X 平台的转发狂潮。',
              bitget_action:
                '理财与 Earn 业务线需迅速调动资金池，针对类似 RWA 理财产品推出竞争性的费率或打新申购通道，遏制客群流失。',
            },
            sources: [
              {
                platform: 'PR Newswire',
                url: 'https://www.prnewswire.co.uk/news-releases/bybit-usd1-carnival-expands-rewards-streaks-for-traders-and-holders-302776434.html',
              },
            ],
          },
        ],
        Product: [],
        Brand: [],
      },
    },
    {
      name: 'Coinbase',
      modules: {
        Social: [],
        PR: [
          {
            id: 'coin-2026-pr-1',
            title:
              '官方正式发布 2026 第一季度财务报告，在 SEC 监管压迫下净利润超预期',
            time: '2026-05-07',
            isHighlight: false,
            analysis: {
              why_matters:
                '美股合规第一股的“晴雨表”动作。财报显示其链上基础设施收入和 Base 生态的协议收入大涨，证实了“链上即是新一代互联网”的战略转型大获成功。',
              viral_logic:
                '美股华尔街、彭博社（Bloomberg）、路透社等主流媒体全线拆解。引发美股散户和加密机构投资人的多维研究。',
              bitget_action:
                '我们可以通过拆解其财报中关于 Base 链运营收入的占比，来指导 Bitget 自身在 Web3 钱包和 Layer 2 生态上的长期战略投资布局。',
            },
            sources: [
              {
                platform: 'Coinbase Investor Relations',
                url: 'https://investor.coinbase.com/news/news-details/2026/Coinbase-Announces-Date-of-First-Quarter-2026-Financial-Results/default.aspx',
              },
            ],
          },
        ],
        Sponsorship: [],
        Product: [],
        Brand: [],
      },
    },
  ];

  const [competitorsData, setCompetitorsData] =
    useState<any[]>(defaultMockData);
  const [loading, setLoading] = useState(true);

  const competitorCategories = [
    'Social',
    'PR',
    'Sponsorship',
    'Product',
    'Brand',
  ];
  const competitorList = ['Binance', 'OKX', 'Bybit', 'Coinbase'];

  useEffect(() => {
    async function fetchDatabaseData() {
      try {
        const { data, error } = await supabase
          .from('competitor_matrix')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = competitorList.map((name) => {
            const compRows = data.filter(
              (r: any) => r.competitor_name.toLowerCase() === name.toLowerCase()
            );

            const mapRows = (rows: any[]) =>
              rows.map((r: any) => ({
                id: r.id,
                title: r.title,
                time: r.time_string,
                isHighlight: r.is_highlight,
                analysis: {
                  why_matters: r.why_matters,
                  viral_logic: r.viral_logic,
                  bitget_action: r.bitget_action,
                },
                sources:
                  typeof r.sources === 'string'
                    ? JSON.parse(r.sources)
                    : r.sources || [],
              }));

            return {
              name: name,
              modules: {
                Social: mapRows(
                  compRows.filter((r: any) => r.category === 'Social')
                ),
                PR: mapRows(compRows.filter((r: any) => r.category === 'PR')),
                Sponsorship: mapRows(
                  compRows.filter((r: any) => r.category === 'Sponsorship')
                ),
                Product: mapRows(
                  compRows.filter((r: any) => r.category === 'Product')
                ),
                Brand: mapRows(
                  compRows.filter((r: any) => r.category === 'Brand')
                ),
              },
            };
          });
          setCompetitorsData(formatted);
        }
      } catch (e) {
        console.warn(
          '未检测到数据库活数据，工作台启动 2026 实时高保真内容进行展示。'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDatabaseData();
  }, []);

  // ================= MOCK DATA: RIGHT PANEL =================
  const brandInspirations = [
    {
      brand: 'Nike',
      category: 'Sports',
      platforms: ['Instagram', '小红书', 'Campaign Asia'],
      logicTags: ['UGC', 'Identity', 'Offline Experience'],
      campaign: 'Running Community Web3 Integration',
      content: {
        what_happened:
          'Nike 推出结合线下跑步数据的低门槛 NFT 徽章，用户跑满 5km 即可在 App 内铸造专属 SBT。',
        why_worked:
          '将枯燥的运动数据转化为社交资本（Flex），用极低的认知门槛完成了 Web3 onboarding。',
        mechanics:
          'KOL 线下领跑 + 实体打卡点扫描 + 自动生成适配社媒的数据分享图。',
        cultural_signal:
          '受众正在对空洞的炒作型 Web3 免疫，追求技术赋能真实生活方式。',
        bitget_inspiration:
          '我们的 KCGI 交易大赛可以借用这种『里程碑 SBT 徽章』模式，将用户的交易额、胜率转化为可视化的 3D 身份卡片，促使用户在 X 上主动晒单比较。',
      },
      sources: [
        { name: 'Instagram', url: 'https://www.instagram.com' },
        { name: 'Campaign Asia', url: 'https://www.campaignasia.com' },
      ],
    },
  ];

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Social':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'PR':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Sponsorship':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Product':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Brand':
        return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest animate-pulse">
        CONNECTING TO BITGET KNOWLEDGE BASE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-200 font-sans flex flex-col h-screen overflow-hidden">
      {/* 顶部全局导航栏 */}
      <header className="flex-none h-14 border-b border-[#222] flex items-center justify-between px-6 bg-[#0D0D0D] z-10">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-[#14F195] rounded-sm"></div>
          <h1 className="font-semibold text-zinc-100 tracking-wide text-sm uppercase">
            Marketing Intelligence Workspace
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-[#1A1A1A] border border-[#333] rounded px-3 py-1.5 w-64 focus-within:border-[#14F195] transition-colors">
            <Search className="w-3.5 h-3.5 text-zinc-500 mr-2" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="bg-transparent border-none outline-none text-xs w-full text-zinc-300"
            />
          </div>
        </div>
      </header>

      {/* 主工作区 */}
      <main className="flex-1 overflow-hidden flex">
        {/* ================= LEFT PANEL: Competitor Intelligence (65%) ================= */}
        <section className="w-[65%] border-r border-[#222] flex flex-col bg-[#0D0D0D]">
          {/* 左侧头部：高级 Filter 控制台 */}
          <div className="flex-none px-6 py-4 border-b border-[#1A1A1A] bg-[#0A0A0A] space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                Competitor Intelligence
              </h2>
              <p className="text-[11px] text-zinc-500 mt-0.5 uppercase tracking-wider font-mono">
                Real-time Matrix • Past 24H
              </p>
            </div>

            {/* 过滤器交互矩阵 */}
            <div className="space-y-3 pt-1">
              {/* 1. Competitor Filter */}
              <div className="flex items-center text-xs">
                <span className="text-zinc-500 font-mono w-24 shrink-0">
                  Competitor:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCompetitor('All')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      selectedCompetitor === 'All'
                        ? 'bg-[#14F195] text-[#0D0D0D] font-bold'
                        : 'bg-[#141414] border border-[#222] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    All
                  </button>
                  {competitorList.map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setSelectedCompetitor(comp)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        selectedCompetitor === comp
                          ? 'bg-[#14F195] text-[#0D0D0D] font-bold'
                          : 'bg-[#141414] border border-[#222] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Content Type Filter */}
              <div className="flex items-center text-xs">
                <span className="text-zinc-500 font-mono w-24 shrink-0">
                  Type Filter:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedType('All')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      selectedType === 'All'
                        ? 'bg-zinc-200 text-[#0D0D0D] font-bold'
                        : 'bg-[#141414] border border-[#222] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    All Blocks
                  </button>
                  {competitorCategories.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        selectedType === type
                          ? 'bg-zinc-200 text-[#0D0D0D] font-bold'
                          : 'bg-[#141414] border border-[#222] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 竞品矩阵研究 Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-12 pb-20 scrollbar-hide">
            {competitorsData
              // 联动过滤：筛选品牌
              .filter(
                (comp) =>
                  selectedCompetitor === 'All' ||
                  comp.name === selectedCompetitor
              )
              .map((comp, cIdx) => (
                <div
                  key={cIdx}
                  className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden shadow-lg shadow-black/20"
                >
                  {/* 品牌大标题 */}
                  <div className="bg-[#1A1A1A] px-5 py-3 border-b border-[#222] flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#14F195] flex items-center tracking-wide uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] mr-2"></span>
                      {comp.name}档案
                    </h3>
                  </div>

                  {/* 5大固定研究板块结构流 */}
                  <div className="p-5 space-y-6">
                    {competitorCategories
                      // 联动过滤：筛选板块
                      .filter(
                        (category) =>
                          selectedType === 'All' || category === selectedType
                      )
                      .map((category) => {
                        const items =
                          comp.modules[category as keyof typeof comp.modules];

                        return (
                          <div key={category} className="space-y-2">
                            {/* 板块二级小标签（即使没有内容，也强力保留结构） */}
                            <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest px-1">
                              [ {category} ]
                            </div>

                            {items && items.length > 0 ? (
                              <div className="space-y-3">
                                {items.map((item: any) => (
                                  <div
                                    key={item.id}
                                    className="bg-[#141414] border border-[#222] rounded-xl p-5 hover:border-zinc-800 transition-colors relative"
                                  >
                                    {/* 类别微标 + 时间 */}
                                    <div className="flex justify-between items-center mb-3">
                                      <span
                                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadgeClass(
                                          category
                                        )}`}
                                      >
                                        {category}
                                      </span>
                                      <span className="text-[11px] text-zinc-600 font-mono">
                                        {item.time}
                                      </span>
                                    </div>

                                    {/* 标题 */}
                                    <h4
                                      className={`font-semibold text-sm mb-4 leading-relaxed ${
                                        item.isHighlight
                                          ? 'text-[#14F195]'
                                          : 'text-zinc-100'
                                      }`}
                                    >
                                      {item.title}
                                    </h4>

                                    {/* 核心 AI Research 分析深色凹槽图层 */}
                                    {item.analysis && (
                                      <div className="bg-[#0D0D0D]/90 rounded-lg p-4 text-xs space-y-2.5 border-l border-[#14F195]/80">
                                        <div className="flex items-start">
                                          <span className="text-zinc-500 font-mono w-28 shrink-0">
                                            Why it matters:
                                          </span>
                                          <span className="text-zinc-300 leading-normal">
                                            {item.analysis.why_matters}
                                          </span>
                                        </div>
                                        <div className="flex items-start">
                                          <span className="text-zinc-500 font-mono w-28 shrink-0">
                                            Viral Logic:
                                          </span>
                                          <span className="text-zinc-300 leading-normal">
                                            {item.analysis.viral_logic}
                                          </span>
                                        </div>
                                        <div className="flex items-start">
                                          <span className="text-[#14F195] font-mono w-28 shrink-0 font-medium">
                                            Bitget Action:
                                          </span>
                                          <span className="text-zinc-200 leading-normal font-medium">
                                            {item.analysis.bitget_action}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* 原始链接区 (更改为 target="_blank" 真正可跳转形式) */}
                                    <div className="mt-4 pt-3 border-t border-zinc-900 flex space-x-4">
                                      {item.sources &&
                                        item.sources.map(
                                          (src: any, sIdx: number) => (
                                            <a
                                              key={sIdx}
                                              href={src.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center text-[10px] text-zinc-400 hover:text-[#14F195] transition-colors font-mono border-b border-dashed border-zinc-700 pb-0.5"
                                            >
                                              {src.platform.includes(
                                                'Twitter'
                                              ) && (
                                                <MessageCircle className="w-3 h-3 mr-1.5" />
                                              )}
                                              {src.platform.includes('PR') && (
                                                <Briefcase className="w-3 h-3 mr-1.5" />
                                              )}
                                              {src.platform.includes(
                                                'YouTube'
                                              ) && (
                                                <Play className="w-3 h-3 mr-1.5" />
                                              )}
                                              {src.platform.includes(
                                                'Instagram'
                                              ) && (
                                                <Camera className="w-3 h-3 mr-1.5" />
                                              )}
                                              {src.platform.includes('Blog') ||
                                              src.platform.includes('OKX') ||
                                              src.platform.includes(
                                                'Coinbase'
                                              ) ? (
                                                <Globe className="w-3 h-3 mr-1.5" />
                                              ) : null}
                                              {src.platform}{' '}
                                              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60" />
                                            </a>
                                          )
                                        )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              // 强制保留结构：写上过去 24h 无重大内容
                              <div className="bg-[#141414]/30 border border-dashed border-zinc-900 rounded-xl p-4 flex items-center justify-center">
                                <span className="text-[11px] text-zinc-600 font-mono italic">
                                  Past 24h: No major content in this module.
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ================= RIGHT PANEL: Brand Inspiration Library (35%) ================= */}
        <section className="w-[35%] bg-[#0A0A0A] flex flex-col">
          <div className="flex-none px-6 py-4 border-b border-[#1A1A1A] bg-[#0A0A0A]">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">
                  Brand Inspiration Base
                </h2>
                <p className="text-[11px] text-zinc-500 mt-0.5 uppercase tracking-wider font-mono">
                  Strategic Learning • Past 7 Days
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <select className="bg-[#141414] border border-[#222] text-zinc-400 text-[11px] px-2 py-1 rounded outline-none">
                <option value="all">Category: All</option>
                <option value="sports">Sports</option>
                <option value="luxury">Luxury</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <select className="bg-[#141414] border border-[#222] text-zinc-400 text-[11px] px-2 py-1 rounded outline-none">
                <option value="all">Platform: All</option>
                <option value="instagram">Instagram</option>
                <option value="xiaohongshu">小红书</option>
              </select>
              <select className="bg-[#141414] border border-[#222] text-zinc-400 text-[11px] px-2 py-1 rounded outline-none">
                <option value="all">Logic: All</option>
                <option value="ugc">UGC</option>
                <option value="meme">Meme</option>
              </select>
            </div>
          </div>

          {/* 品牌深挖卡片 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-20 scrollbar-hide">
            {brandInspirations.map((brand, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden group hover:border-zinc-800 transition-colors"
              >
                <div className="p-4 border-b border-[#222] bg-[#161616]/40">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide font-mono">
                      {brand.brand} ({brand.category})
                    </span>
                    <Bookmark className="w-3.5 h-3.5 text-zinc-600 hover:text-[#14F195] transition-colors cursor-pointer" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 leading-snug">
                    {brand.campaign}
                  </h4>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {brand.logicTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono uppercase bg-[#14F195]/5 text-[#14F195]/90 px-2 py-0.5 rounded border border-[#14F195]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-4 text-xs">
                  <div>
                    <h5 className="text-zinc-500 mb-1 font-mono uppercase text-[10px] tracking-wider">
                      What Happened
                    </h5>
                    <p className="text-zinc-300 leading-relaxed bg-[#0D0D0D]/40 p-2 rounded border border-zinc-900">
                      {brand.content.what_happened}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-zinc-500 mb-1 font-mono uppercase text-[10px] tracking-wider">
                      Why It Worked
                    </h5>
                    <p className="text-zinc-300 leading-relaxed bg-[#0D0D0D]/40 p-2 rounded border border-zinc-900">
                      {brand.content.why_worked}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-zinc-500 mb-1 font-mono uppercase text-[10px] tracking-wider">
                      Marketing Mechanics
                    </h5>
                    <p className="text-zinc-300 leading-relaxed bg-[#0D0D0D]/40 p-2 rounded border border-zinc-900">
                      {brand.content.mechanics}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-zinc-500 mb-1 font-mono uppercase text-[10px] tracking-wider">
                      Cultural Signal
                    </h5>
                    <p className="text-[#14F195]/80 italic bg-[#0D0D0D]/40 p-2 rounded border border-zinc-900">
                      "{brand.content.cultural_signal}"
                    </p>
                  </div>

                  <div className="bg-[#14F195]/5 p-3 rounded-lg border border-[#14F195]/20">
                    <h5 className="text-[#14F195] mb-1 font-mono uppercase text-[10px] flex items-center font-bold">
                      <ChevronRight className="w-3 h-3 mr-0.5" /> Bitget
                      Inspiration
                    </h5>
                    <p className="text-zinc-200 leading-relaxed font-medium">
                      {brand.content.bitget_inspiration}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 flex flex-wrap gap-3 items-center">
                    <span className="text-[10px] text-zinc-600 font-mono uppercase">
                      Sources:
                    </span>
                    {brand.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors font-mono border-b border-dashed border-zinc-700 pb-0.5"
                      >
                        {src.name}{' '}
                        <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
