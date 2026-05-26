import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Marketing Intelligence Workspace',
  description: 'Bitget Marketing Workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
}
