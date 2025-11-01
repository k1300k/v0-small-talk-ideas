export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💬</div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SmallTalk</h1>
            <p className="text-sm text-slate-500">매일의 스몰톡 주제 추천 서비스</p>
          </div>
        </div>
        <div className="text-sm text-slate-600">✨ 더 나은 직장 문화를 위해</div>
      </div>
    </header>
  )
}
