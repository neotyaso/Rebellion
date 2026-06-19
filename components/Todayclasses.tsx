'use client';

import { useState, useEffect } from "react";

// 1. 型定義
interface Course {
  period: string;
  name: string;
  room: string;
  absent: number;
  late: number;
  max: number;
}

interface ScheduleData {
  [key: number]: Course[];
}

// 2. テスト用のダミーデータ（実際の開発ではAPIやPropsから取得する想定）
const dummySchedule: ScheduleData = {
  1: [ // 月曜日
    { period: "2限", name: "情報ネットワーク", room: "302教室", absent: 0, late: 2, max: 3 },
    { period: "4限", name: "プログラミング応用", room: "PC演習室2", absent: 1, late: 0, max: 3 }
  ],
  2: [], // 火曜日
  3: [ // 水曜日
    { period: "1限", name: "データベース基礎", room: "201教室", absent: 2, late: 2, max: 3 }
  ],
  4: [ // 木曜日（今日）
    { period: "2限", name: "情報セキュリティ", room: "405教室", absent: 0, late: 2, max: 3 },
    { period: "4限", name: "課題解決実習", room: "地域連携ラボ", absent: 1, late: 2, max: 3 }
  ],
  5: [ // 金曜日
    { period: "3限", name: "キャリアデザイン", room: "大講義室", absent: 0, late: 2, max: 3 }
  ],
  0: [], // 日曜日
  6: []  // 土曜日
};

const weekDaysJa = ["日", "月", "火", "水", "木", "金", "土"];

export default function TodayClasses() {
  // 曜日（0〜6）の状態管理
  const [dayOfWeek, setDayOfWeek] = useState<number>(new Date().getDay());

  useEffect(() => {
    // 0:00の切り替えを監視するタイマー
    const timer = setInterval(() => {
      const now = new Date();
      // 0時0分になったら、最新の曜日に更新して再レンダリングをトリガー
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setDayOfWeek(now.getDay());
      }
    }, 60000); // 1分ごとにチェック

    return () => clearInterval(timer); // クリーンアップ
  }, []);

  const todaysClasses = dummySchedule[dayOfWeek] || [];

  return (
    <section className="bg-white mt-2 mx-2">
      <div className="flex items-center  mb-2">
          <h2 className="font-bold text-gray-800 text-xl ">本日の授業</h2>
        <span className="bg-gray-100 text-gray-600 rounded-full font-normal text-xs  py-1 px-2  ">
          {weekDaysJa[dayOfWeek]}曜日
        </span>
      </div>

      <div className="space-y-3">
        {todaysClasses.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            本日の授業はありません
          </div>
        ) : (
          todaysClasses.map((course, index) => {
            // 欠席数が上限のマイナス1回以上なら危険フラグ
            const isDanger = course.absent >= course.max - 1;

            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono">
                      {course.period}
                    </span>
                  <h3 className="text-sm font-semibold text-gray-800 mt-1">{course.name}</h3>
                    <span className="text-xs text-gray-400">{course.room}</span>
                  </div>
                </div>
                {/* 欠席回数 */}
                <div className="">
                  <span className="text-xs text-gray-400 block">欠席</span>
                  <span className={`text-sm ${isDanger ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {course.absent} <span className="text-xs text-gray-400">/ {course.max}回</span>
                  </span>
                  {isDanger && (
                    <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded ml-2 block sm:inline">
                      あと1回でアウト
                    </span>
                  )}
                </div>
                {/* 遅刻回数 */}
                <div className="">
                  <span className="text-xs text-gray-400 block">遅刻</span>
                  <span className={`text-sm ${isDanger ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {course.absent} <span className="text-xs text-gray-400">/ {course.max}回</span>
                  </span>
                </div>
                {/* 出席回数 */}
                <div className="">
                  <span className="text-xs text-gray-400 block">出席</span>
                  <span className={`text-sm ${isDanger ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {course.absent} <span className="text-xs text-gray-400">/ {course.max}回</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}