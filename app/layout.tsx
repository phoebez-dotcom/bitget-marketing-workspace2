import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Intelligence Workspace',
  description: 'Bitget Marketing Intelligence Workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
