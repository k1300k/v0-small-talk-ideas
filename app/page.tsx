"use client"

import { useState, useEffect } from "react"
import TopicCard from "@/components/topic-card"
import CategoryFilter from "@/components/category-filter"
import Header from "@/components/header"
import ProgramInfo from "@/components/program-info"

interface Topic {
  id: number
  category: string
  title: string
  description: string
  source: string
  date: string
  dateLabel: string
  tags: string[]
}

const CATEGORIES = [
  { id: "all", label: "전체", icon: "🌟" },
  { id: "연예", label: "연예", icon: "🎬" },
  { id: "스포츠", label: "스포츠", icon: "⚽" },
  { id: "교육", label: "교육", icon: "📚" },
  { id: "경제", label: "경제", icon: "💰" },
  { id: "메인뉴스", label: "메인뉴스", icon: "📰" },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [showProgramInfo, setShowProgramInfo] = useState(false)

  const fetchTopics = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/topics")
      const data = await response.json()
      setTopics(data)
      setLastUpdated(new Date())
      console.log("[v0] Topics updated:", data.length, "items")
    } catch (error) {
      console.error("[v0] Error fetching topics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 초기 데이터 로드
    fetchTopics()

    // 1시간마다 데이터 갱신 (3600000ms)
    const interval = setInterval(() => {
      console.log("[v0] Auto-refreshing topics...")
      fetchTopics()
    }, 3600000) // 1시간 = 3600000ms

    return () => clearInterval(interval)
  }, [])

  const groupedTopics = topics.reduce(
    (acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = []
      }
      acc[topic.category].push(topic)
      return acc
    },
    {} as Record<string, Topic[]>,
  )

  const categoriesToShow = selectedCategory === "all" ? Object.keys(groupedTopics) : [selectedCategory]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              스몰톡 토픽
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-2">점심시간에 나눌 만한 흥미로운 이야기 주제를 매일 추천해드립니다</p>

          {lastUpdated && (
            <p className="text-sm text-slate-500">마지막 업데이트: {lastUpdated.toLocaleTimeString("ko-KR")}</p>
          )}

          <p className="text-sm text-blue-600 font-medium mt-2">🔄 매일 오늘과 어제의 토픽을 함께 제공합니다</p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowProgramInfo(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
          >
            ℹ️ 프로그램 설명
          </button>
        </div>

        {showProgramInfo && <ProgramInfo onClose={() => setShowProgramInfo(false)} />}

        <div className="mb-10">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
            <p className="text-slate-600 mt-4">토픽을 불러오는 중...</p>
          </div>
        ) : (
          <>
            {categoriesToShow.map((category) => (
              <div key={category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {CATEGORIES.find((c) => c.id === category)?.label}
                  </h2>
                  <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {groupedTopics[category].length}개
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {groupedTopics[category].map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </div>
            ))}

            {categoriesToShow.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">선택한 카테고리에 주제가 없습니다.</p>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-12">
          <button
            onClick={fetchTopics}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? "업데이트 중..." : "지금 새로고침"}
          </button>
        </div>
      </div>
    </main>
  )
}
