import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; 
import Main from '@/components/Main'; // Main コンポーネントをインポート
import TodayClasses from '@/components/Todayclasses';

const inter = Inter({ subsets: ['latin'] });

// 検索エンジン向けの設定や、ブラウザのタブに表示されるタイトル
export const metadata: Metadata = {
  title: 'Rebellion - 履修システム',
  description: 'キャンパススクエアの課題を解決する、スマートな履修管理アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex justify-center`}>
        
        {/* スマホサイズ（最大幅 md = 448px）に固定する魔法のコンテナ */}
        <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-lg shadow-gray-200/50">
          
          {/* 常に上に固定されるヘッダー */}
          <Header />
          <Main /> {/* ここで Main コンポーネントを呼び出す */}
          <TodayClasses />
          
          {/* ここに各ページの page.tsx の中身が自動的に流し込まれる */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          
        </div>

      </body>
    </html>
  );
}