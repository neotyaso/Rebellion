const mockCourses = [
  { code: 'B30B01S2', name: '共通基盤ワークショップ２Ａ', teacher: '宮田 佳美', dayOfWeek: 0, period: 3, color: 'bg-orange-500/90' },
  { code: 'B31Q07A2', name: 'Web入門', teacher: '牧 紀子', dayOfWeek: 0, period: 5, color: 'bg-indigo-500/90' },
  { code: 'B31N01A1', name: '確率統計リテラシ１', teacher: '鈴木 誠', dayOfWeek: 1, period: 4, color: 'bg-stone-500/90 ' },
  { code: 'B30F07A2', name: '政治行動', teacher: '渡邊 涼一', dayOfWeek: 2, period: 1, color: 'bg-amber-500/90 ' },
  { code: 'B30H01F2', name: 'スポーツで健康を科学する', teacher: '中務 真衣', dayOfWeek: 2, period: 2, color: 'bg-teal-500/90 ' },
  { code: 'B31Q06A2', name: 'デザイン思考', teacher: '中茂 睦裕', dayOfWeek: 2, period: 3, color: 'bg-cyan-600/90 ' },
  { code: 'B31R03B2', name: '金融情報処理１', teacher: '松山 智彦', dayOfWeek: 2, period: 4, color: 'bg-green-600/90 ' },
  { code: 'B31M03A2', name: '情報学課題解決実習２Ａ', teacher: 'シャー', dayOfWeek: 3, period: 1, color: 'bg-rose-500/90' },
  { code: 'B31L08D2', name: 'オブジェクト指向プログラミング実習', teacher: '本多 博彦', dayOfWeek: 4, period: 1, color: 'bg-purple-500/90' },
];

export default function Main() {
  const days = ['月', '火', '水', '木', '金'];
  const periods = [1, 2, 3, 4, 5];

  return (
    // レイアウトコードをすべてそのまま維持
    <div className="pb-50 mx-2 mt-2 h-full flex flex-col bg-gray-50/30">
      
      {/* 1. 曜日を表示するヘッダー行 */}
      <div className="grid grid-cols-[45px_1fr_1fr_1fr_1fr_1fr] gap-0.5 mb-0.5 text-center">
        {/* 左上の空白部分を下の時限マスの幅（45px）とぴったり一致させる */}
        <div className="w-11.25"></div>
        {days.map((day) => (
          <div 
            key={day} 
            className="text-sm font-medium text-gray-800 py-0.5 bg-transparent"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 2. 時限 × 曜日のグリッド本体 */}
      <div className="grow flex flex-col gap-1">
        {periods.map((period) => (
          // 💡 ここも比率を [左端45px、残り5列は均等] に変更
          <div key={period} className="grid grid-cols-[45px_1fr_1fr_1fr_1fr_1fr] gap-0.5 flex-1 min-h-13.5">
            
            {/* 左端の時限表示（1〜5） */}
            <div className="w-11.25 bg-gray-100/80 rounded-md flex flex-col items-center justify-center py-0.5 text-gray-500 border border-gray-200/50">
              {/* 時間割 */}
              <span className="text-lg font-semibold text-black leading-none">{period}</span>
              {/* 授業時間 */}
              <div className="text-xs text-gray-700 scale-80 leading-none mt-0.5 text-center">
                {period === 1 && (<div className="text-xs">09:00<br/>|<br/>10:30</div>)}
                {period === 2 && (<div className="text-xs">10:40<br/>|<br/>12:10</div>)}
                {period === 3 && (<div className="text-xs">13:10<br/>|<br/>14:40</div>)}
                {period === 4 && (<div className="text-xs">14:50<br/>|<br/>16:20</div>)}
                {period === 5 && (<div className="text-xs">16:30<br/>|<br/>18:00</div>)}
              </div>
            </div>

            {/* 各曜日のマス目（5日分） */}
            {days.map((day, dayIndex) => {
              const course = mockCourses.find(
                (c) => c.dayOfWeek === dayIndex && c.period === period
              );

              //授業データがある場合の見た目
              if (course) {
                return (
                  <div
                    key={`${day}-${period}`}
                    className={`${course.color} rounded-md flex flex-col items-center justify-center p-0.5 text-center shadow-sm relative overflow-hidden`}
                  >
                    {/* 授業名*/}
                    <span className="text-xs font-medium leading-tight text-black tracking-tighter">
                      {course.name}
                    </span>
                    {/* 担当教員（苗字だけにしてスッキリ） */}
                    <span className="text-xs opacity-90 text-black mt-0.5 scale-90 leading-none font-medium">
                      {course.teacher.split(' ')[0]}
                    </span>
                  </div>
                );
              }

              //空きコマの場合の見た目
              return (
                <div
                  key={`${day}-${period}`}
                  className="bg-white hover:bg-gray-50/80 rounded-md border border-dashed border-gray-200 flex flex-col items-center justify-center p-0 transition-all relative"
                >
                  <span className="text-xs text-gray-800 font-medium tracking-tighter">空き</span>
                </div>
              );
            })}

          </div>
        ))}
      </div>
    </div>
  );
}