"use client";

import { Menu, ChevronDown, Bell } from 'lucide-react';

type RegistrationStatus = 'none' | 'register' | 'modify';

const registrationStatus: RegistrationStatus = 'register';
const hasNotification: boolean = true;

export default function Header() {
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
      <div className="w-full  px-4 py-1 flex justify-center items-center">
        {registrationStatus === 'modify' && (
          <div className="text-[10px] font-bold bg-amber-50 text-amber-800 px-3 py-0.5 rounded-full border border-amber-100 flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            履修修正期間中（〜4/15）
          </div>
        )}
        {registrationStatus === 'register' && (
          <div className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            履修登録期間中
          </div>
        )}
        {registrationStatus === 'none' && (
          <div className="text-[10px] font-medium bg-gray-50 text-gray-500 px-3 py-0.5 rounded-full border border-gray-100">
            履修確定（期間外）
          </div>
        )}
      </div>
    </header>
  );
}