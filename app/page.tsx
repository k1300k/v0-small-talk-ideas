"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsCard from "@/components/news-card"
import StockCard from "@/components/stock-card"
import { TrendingUp, Globe, Zap, Briefcase, BarChart3 } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  source: string
  date: string
  category: string
}

interface StockData {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  image: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("news")

  // Mock 뉴스 데이터
  const newsData: NewsArticle[] = [
    {
      id: "1",
      title: "AI 기술이 산업을 혁신하다",
      description: "인공지능 기술이 다양한 산업에서 빠르게 도입되고 있습니다.",
      image: "/ai-technology-innovation.jpg",
      source: "TechNews",
      date: "2025-11-06",
      category: "technology",
    },
    {
      id: "2",
      title: "글로벌 경제 전망 개선",
      description: "국제 금융기관이 올해 경제 성장률을 상향 조정했습니다.",
      image: "/global-economy.jpg",
      source: "BusinessDaily",
      date: "2025-11-05",
      category: "business",
    },
    {
      id: "3",
      title: "스포츠 팬들을 위한 새로운 앱 출시",
      description: "실시간 스포츠 정보를 한 곳에서 확인할 수 있는 앱이 나왔습니다.",
      image: "/sports-app-launch.jpg",
      source: "SportsToday",
      date: "2025-11-04",
      category: "sports",
    },
  ]

  // Mock 주식 데이터
  const stockData: StockData[] = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 235.48,
      change: 2.45,
      changePercent: 1.05,
      image: "/apple-logo.png",
    },
    {
      id: "2",
      symbol: "GOOGL",
      name: "Google (Alphabet)",
      price: 178.92,
      change: -1.23,
      changePercent: -0.68,
      image: "/google-logo.png",
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 416.25,
      change: 5.67,
      changePercent: 1.38,
      image: "/microsoft-logo.png",
    },
    {
      id: "4",
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 308.5,
      change: -8.3,
      changePercent: -2.62,
      image: "/tesla-logo.png",
    },
  ]

  const techNews = newsData.filter((article) => article.category === "technology")
  const businessNews = newsData.filter((article) => article.category === "business")
  const sportsNews = newsData.filter((article) => article.category === "sports")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={32} />
            Small Talk Ideas
          </h1>
          <p className="text-muted-foreground mt-1">뉴스와 주식 정보를 한 곳에서</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted p-1 mb-8">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Globe size={18} />
              <span className="hidden sm:inline">뉴스</span>
            </TabsTrigger>
            <TabsTrigger value="technology" className="flex items-center gap-2">
              <Zap size={18} />
              <span className="hidden sm:inline">기술</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Briefcase size={18} />
              <span className="hidden sm:inline">비즈니스</span>
            </TabsTrigger>
            <TabsTrigger value="sports" className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <span className="hidden sm:inline">스포츠</span>
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex items-center gap-2">
              <BarChart3 size={18} />
              <span className="hidden sm:inline">주식</span>
            </TabsTrigger>
          </TabsList>

          {/* All News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">모든 뉴스</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">기술 뉴스</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">비즈니스 뉴스</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sports Tab */}
          <TabsContent value="sports" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">스포츠 뉴스</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportsNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Stocks Tab - 주식 카테고리 */}
          <TabsContent value="stocks" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">주식 시세</h2>
              <p className="text-muted-foreground mb-6">실시간 주요 기업 주가 정보</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {stockData.map((stock) => (
                  <StockCard key={stock.id} stock={stock} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
