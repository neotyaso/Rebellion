'use client';

import { TrendingUp, Award, BookOpen, GraduationCap } from 'lucide-react'; 

export default function Grades() {
  // 実際にはAPIやDBから取得するデータ
  const gradeData = {
    totalEarned: 64,       // 取得済み単位
    required: 124,         // 卒業必要単位
    currentSemester: 22,   // 今期の履修登録単位
    semesterLimit: 24,     // 履修上限
    gpa: 3.12,             // 通算GPA
    prevGpa: 2.95          // 前学期GPA
  };

  // 卒業単位の進捗率を計算
  const progressPercent = Math.min(Math.round((gradeData.totalEarned / gradeData.required) * 100), 100);
  
  // GPAのトレンド判定
  const isGpaUp = gradeData.gpa >= gradeData.prevGpa;

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-md mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center space-x-2 border-b border-gray-50 pb-3">
        <h2 className="font-bold text-gray-800 text-xl">学修状況・判定</h2>
      </div>

      {/* 卒業単位進捗バー */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-sm font-medium text-gray-600">卒業要件単位の進捗</span>
          <span className="text-2xl font-black text-indigo-600">
            {progressPercent}<span className="text-xs text-gray-400 ml-0.5">%</span>
          </span>
        </div>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-right text-gray-400">
          取得済み {gradeData.totalEarned} / 必要 {gradeData.required} 単位
        </p>
      </div>

      {/* 詳細グリッド */}
      <div className="grid grid-cols-2 gap-4">
        {/* 今期の履修状況 */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-gray-500">今期の履修</span>
          </div>
          <p className="text-lg font-bold text-gray-800">
            {gradeData.currentSemester} <span className="text-[10px] text-gray-400 font-normal">/ {gradeData.semesterLimit} 単位</span>
          </p>
        </div>

        {/* GPA表示 */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-gray-500">後学期GPA</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-gray-800">{gradeData.gpa.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* 補足メッセージ（地味に嬉しい機能） */}
      <div className="bg-indigo-50 p-3 rounded-lg">
        <p className="text-[11px] text-indigo-700 leading-relaxed text-center">
          卒業まであと <span className="font-bold">{gradeData.required - gradeData.totalEarned}</span> 単位です。
          {gradeData.currentSemester >= 20 ? ' 今期はフル履修ですね、頑張りましょう！' : ' 順調なペースです。'}
        </p>
      </div>
    </section>
  );
}