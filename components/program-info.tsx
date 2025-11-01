"use client"

interface ProgramInfoProps {
  onClose: () => void
}

export default function ProgramInfo({ onClose }: ProgramInfoProps) {
  const programHistory = [
    {
      version: "v1.0",
      date: "초기 개발",
      title: "스몰톡 토픽 서비스 오픈",
      userPrompt:
        "너는 15년차 서비스기획 전문가야. Small talk 이야기 꺼리 서비스를 만들려고 해. 배경은 직장인들의 고민은 점심 먹으면서까지 매일 업무이야기를 하는 거야. 그런 것을 너무나 젊은 사람들이 싫어하는 것 같아. 그래서 전날 기사거리로 적정한 스몰톡 안건을 만들어 주는 거야. 추가적으로 상대방의 관심거리를 위해 상단에 카테고리를 추가했으면 좋겠어. 예를 들면, 연예, 스포츠, 교육, 경제(주식, 코인), 메인뉴스. 정치나 종교등의 민감한 이야기는 제외시켜주고 해당 사항으로 구성해 주세요.",
      features: [
        "카테고리 필터링 (연예, 스포츠, 교육, 경제, 메인뉴스)",
        "정치/종교 등 민감한 주제 제외",
        "스몰톡 토픽 카드 기반 UI",
        "상위 카테고리로 분류된 뉴스 기반 대화 주제",
      ],
      description: "직장인들의 점심시간을 업무 이야기에서 벗어나 가벼운 대화로 채우기 위한 서비스 출시",
    },
    {
      version: "v1.1",
      date: "1차 개선",
      title: "실시간 자동 갱신 기능 추가",
      userPrompt: "사용자 질의: 실시간 업데이트 되나요? → 응답: 시간 마다 일정 시간 마다 (매시간 자동 갱신 요청)",
      features: [
        "매 1시간마다 자동 갱신",
        "Server Action 기반 /api/topics 엔드포인트 생성",
        "사용자 수동 갱신 버튼 추가",
        "마지막 업데이트 시간 표시",
      ],
      description: "정시마다 새로운 토픽이 자동으로 업데이트되도록 기능 구현",
    },
    {
      version: "v1.2",
      date: "2차 개선",
      title: "한국 뉴스 및 네이버 API 연동",
      userPrompt:
        "사용자 질의: 어제 한국시리즈 이야기는 왜 안 나왔나요? → 개선: 네이버 뉴스요약 API를 사용해서 구성해 주세요",
      features: [
        "네이버 뉴스 API 연동 (NAVER_CLIENT_ID, NAVER_CLIENT_SECRET)",
        "한국 뉴스 기반 실시간 토픽 생성",
        "한국시리즈, 손흥민, 한국 드라마 등 한국인 관심사 포함",
        "샘플 데이터에서 실제 네이버 API로 완전 전환",
        "한국 스포츠 이벤트와 국내 트렌드 반영",
      ],
      description: "실제 한국 뉴스를 기반으로 한국시리즈 같은 국내 스포츠 이벤트와 트렌드 뉴스를 실시간으로 제공",
    },
    {
      version: "v1.3",
      date: "3차 개선",
      title: "카테고리 분류 및 일일 데이터 연계",
      userPrompt:
        "사용자 질의 1: 해당 내용 상위 카테고리로 분류해 주시고, 업데이트 시 하루치 데이터 연계 해 주세요 → 사용자 질의 2: 카테고리도 구분해 주세요 → 사용자 질의 3: 카테고리를 네이버 new API에 맞춰서 구성해 주세요",
      features: [
        "상위 카테고리별 명확한 분류 (연예, 스포츠, 교육, 경제, 메인뉴스)",
        "네이버 API 카테고리 구조에 완벽하게 맞춘 매핑",
        "오늘과 어제의 토픽을 함께 제공 (하루치 데이터 연계)",
        "각 토픽 카드에 '오늘/어제' 레이블 표시",
        "카테고리별 섹션 헤더 및 카테고리 아이콘 표시",
        "카테고리별로 명확하게 섹션 분류하여 사용자 경험 향상",
      ],
      description:
        "각 카테고리별로 명확한 섹션 구분과 하루치 데이터를 연계하여 사용자가 쉽게 관심 분야의 토픽을 찾을 수 있도록 개선",
    },
    {
      version: "v1.4",
      date: "4차 개선",
      title: "프로그램 개발 이력 및 프롬프트 기반 정보 추가",
      userPrompt:
        "사용자 질의 1: 해당 서비스는 바이브코딩 프롬프트 방식으로 구성되었습니다. 프롬프트 기반의 프로그램 버전으로 프로그램 설명 버튼 하나 더 추가해 주세요. 우리 프로그램의 이력을 확인할 수 있게요. → 사용자 질의 2: 설명 기능 상세에는 프롬프트의 내역이 전부 들어갔으면 합니다. 어떻게 개선 되었는지 알 수 있도록 → 사용자 질의 3: 실제 프롬프트 질의 내역도 다 반영해 주세요",
      features: [
        "프로그램 정보 모달 추가 (헤더 상단에 정보 버튼)",
        "전체 개발 버전 이력 표시 (v1.0 ~ v1.4)",
        "각 버전별 실제 사용자 프롬프트 질의 내용 전체 포함",
        "버전별 추가된 기능 목록 상세 표시",
        "버전별 개선사항 설명 및 기술적 구현 내용 포함",
        "바이브코딩 프롬프트 방식 기반 진화 과정 시각화",
        "카테고리 정보 및 서비스 소개 페이지",
      ],
      description:
        "프로그램의 전체 개발 이력과 각 단계별 사용자 프롬프트, 개선사항을 한눈에 볼 수 있도록 구현하여 서비스의 진화 과정을 명확하게 표시",
    },
  ]

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* 헤더 */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">프로그램 정보</h2>
              <p className="text-blue-100 text-sm mt-1">바이브코딩 프롬프트 기반 개발 이력</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 소개 섹션 */}
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">서비스 소개</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              <span className="font-semibold text-blue-600">스몰톡 토픽</span>은 직장인들의 점심시간을 더욱 즐겁고
              풍요롭게 만들기 위한 서비스입니다.
            </p>
            <div className="space-y-2 text-slate-700">
              <p>
                <span className="font-semibold">🎯 목표:</span> 업무 이야기에서 벗어나 가벼운 대화를 나누기
              </p>
              <p>
                <span className="font-semibold">📰 데이터:</span> 네이버 뉴스 API를 통한 실시간 한국 뉴스 기반
              </p>
              <p>
                <span className="font-semibold">🔄 업데이트:</span> 매일 오늘과 어제의 토픽을 함께 제공
              </p>
              <p>
                <span className="font-semibold">⏰ 자동 갱신:</span> 매 1시간마다 새로운 주제로 업데이트
              </p>
            </div>
          </div>

          {/* 개발 이력 섹션 */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">개발 이력 및 개선사항</h3>
            <div className="space-y-6">
              {programHistory.map((item, index) => (
                <div key={index} className="border-2 border-slate-200 rounded-lg overflow-hidden">
                  {/* 버전 헤더 */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                        {item.version}
                      </span>
                      <span className="text-sm text-slate-600 font-medium">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                  </div>

                  {/* 버전 컨텐츠 */}
                  <div className="p-4 space-y-4">
                    {/* 프롬프트 */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">사용자 프롬프트:</p>
                      <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 border-l-4 border-blue-400 max-h-32 overflow-y-auto">
                        "{item.userPrompt}"
                      </div>
                    </div>

                    {/* 추가된 기능 */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">추가된 기능:</p>
                      <ul className="space-y-2">
                        {item.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex gap-2 text-sm text-slate-700">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 설명 */}
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-sm text-slate-600 italic">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 카테고리 정보 */}
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">제공 카테고리</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { emoji: "🎬", label: "연예" },
                { emoji: "⚽", label: "스포츠" },
                { emoji: "📚", label: "교육" },
                { emoji: "💰", label: "경제" },
                { emoji: "📰", label: "메인뉴스" },
              ].map((cat) => (
                <div key={cat.label} className="text-center p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <div className="text-sm font-medium text-slate-700">{cat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 닫기 버튼 */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
