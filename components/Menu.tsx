'use client';

import { User, BookOpen, Calendar, PenTool, CheckSquare } from 'lucide-react'; // アイコンライブラリ

export default function Menu() {
  // メニューの項目データ定義
  const menuItems = [
    { name: '学生情報', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: '授業情報', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'スケジュール管理', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: '履修登録・登録状況管理', icon: PenTool, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: '自己判定', icon: CheckSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const handleMenuClick = (menuName: string) => {
    // 実際の遷移処理や関数をここに記述（例: router.push('/path') など）
    console.log(`${menuName} がクリックされました`);
  };

  return (
    <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 max-w-md mx-auto space-y-4">
      {/* ヘッダー */}
      <div className="border-b border-gray-50 pb-2">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">クイックメニュー</h2>
      </div>

      {/* メニューグリッド */}
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          // 「自己判定」だけ5番目で奇数になるので、最後のボタンだけ横いっぱいに広げる
          const isLastOdd = index === menuItems.length - 1 && menuItems.length % 2 !== 0;

          return (
            <button
              key={index}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center space-x-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 
                hover:bg-gray-100 hover:border-gray-200 active:scale-[0.98] transition-all duration-200 text-left
                ${isLastOdd ? 'col-span-2' : 'col-span-1'}`}
            >
              {/* アイコン背景丸 */}
              <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* メニュー名 */}
              <span className="text-sm font-semibold text-gray-700 leading-snug break-all">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}