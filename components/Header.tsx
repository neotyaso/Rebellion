"use client";

import { Menu, ChevronDown, Bell } from 'lucide-react';

export default function Header() {
  // お知らせの赤い点を表示するかどうかのフラグ
  const hasNotification: boolean = true;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* メインヘッダーエリア */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-500">
        
        {/* 左：お知らせ（通知）アイコン */}
        <div className="relative p-2 text-gray-700">
          <Bell className="w-7 h-7 text-gray-700" /> 
          {/* お知らせがあるときは赤い点を表示 */}
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </div>

        {/* 中央：2026年前期表示 ＆ 学期切り替え */}
        <div className="flex items-center gap-1.5 font-bold text-gray-800 text-xl px-2 py-1">
          <span>2026年 前期</span>
          <div className="flex items-center gap-0.5 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-normal">
            <span>学期切替</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* 右側：ハンバーガーメニュー */}
        <div className="text-gray-700 p-2">
          <Menu className="w-7 h-7" />
        </div>

      </div>
    </header>
  );
}