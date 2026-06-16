
export default function Main() {
  const days = ['月', '火', '水', '木', '金'];
  const periods = [1, 2, 3, 4, 5];

  return (
    <div className="pb-50 mx-2 h-full flex flex-col ">
      {/* 1. 曜日を表示するヘッダー行 */}
      <div className="grid grid-cols-6 gap-1 mb-1 text-center">
        {/* 左上の空白部分（時限列のためのスペース） */}
        <div className="text-xs font-bold  flex items-center justify-center py-1">
        </div>
        {/* 月〜金を表示 */}
        {days.map((day) => (
          <div 
            key={day} 
            className="text-xs font-bold text-gray-700  py-1 rounded-lg shadow-sm border border-gray-100"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 2. 時限 × 曜日のグリッド本体 */}
      <div className="flex-grow flex flex-col gap-1">
        {periods.map((period) => (
          <div key={period} className="grid grid-cols-6 gap-1 flex-1 ">
            
            {/* 左端の時限表示（1〜5） */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-500">
              <span className="text-base font-bold text-gray-800">{period}</span>
              {/* 大学の標準的な時間（モックなので目安） */}
              <span className="text-[8px] text-gray-400 mt-0.5">
                {period === 1 && '09:00 - 10:30'}
                {period === 2 && '10:40 - 12:10'}
                {period === 3 && '13:10 - 14:40'}
                {period === 4 && '14:50 - 16:20'}
                {period === 5 && '16:30 - 18:00'}
              </span>
            </div>

            {/* 各曜日のマス目（5日分） */}
            {days.map((day) => (
              <div
                key={`${day}-${period}`}
                className="bg-white hover:bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-1 transition-all relative"
              >
                {/* 💡 ここに後で「履修登録期間だけ押せる＋ボタン」などを忍ばせます */}
                <span className="text-[10px] text-gray-300 font-medium">空き</span>
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}