import { NextResponse } from "next/server"

interface NewsArticle {
  title: string
  description: string
  originallink: string
  source: string
  pubDate: string
  category: string
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  연예: ["한류", "드라마", "영화", "연예인", "K-팝", "배우"],
  스포츠: ["스포츠", "야구", "축구", "손흥민", "한국시리즈", "올림픽", "볼링"],
  교육: ["대학", "입시", "교육", "장학금", "대학원", "수능"],
  경제: ["주식", "코인", "암호화폐", "증시", "재정", "금융"],
  메인뉴스: ["기술", "AI", "과학", "환경", "국제", "우주"],
}

const SENSITIVE_KEYWORDS = [
  "정치",
  "선거",
  "대선",
  "여당",
  "야당",
  "국회",
  "의원",
  "정책",
  "종교",
  "교회",
  "불교",
  "이슬람",
  "신앙",
]

function isSensitiveContent(title: string, description: string): boolean {
  const content = `${title} ${description}`.toLowerCase()
  return SENSITIVE_KEYWORDS.some((keyword) => content.toLowerCase().includes(keyword))
}

let cachedTopics: any[] = []
let lastCachedDate = ""

async function fetchNaverNews(): Promise<NewsArticle[]> {
  try {
    const clientId = process.env.NAVER_CLIENT_ID
    const clientSecret = process.env.NAVER_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.log("[v0] 네이버 API 키가 설정되지 않았습니다.")
      console.log("[v0] v0 UI의 'Vars'에서 NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET을 설정해주세요.")
      console.log("[v0] https://developers.naver.com 에서 발급받으세요.")
      return generateEnhancedSampleTopics()
    }

    const allArticles: NewsArticle[] = []
    const today = new Date().toISOString().split("T")[0]

    if (lastCachedDate !== today) {
      cachedTopics = []
      lastCachedDate = today
      console.log("[v0] 새로운 날짜의 데이터로 업데이트합니다.")
    }

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      for (const keyword of keywords) {
        try {
          const response = await fetch(
            `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}&display=10&sort=date`,
            {
              headers: {
                "X-Naver-Client-Id": clientId,
                "X-Naver-Client-Secret": clientSecret,
              },
            },
          )

          if (!response.ok) {
            const errorData = await response.json()
            console.error("[v0] 네이버 API 에러:", errorData.errorMessage || "Unknown error")
            continue
          }

          const data = await response.json()
          const articles = data.items || []

          const categorizedArticles = articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            originallink: article.link,
            source: article.source,
            pubDate: article.pubDate,
            category: category, // 상위 카테고리로 통일
          }))

          allArticles.push(...categorizedArticles)
          console.log(`[v0] ${category} - ${keyword}: ${articles.length}개 항목`)
        } catch (error) {
          console.error(`[v0] 키워드 '${keyword}' 검색 실패:`, error)
          continue
        }
      }
    }

    if (allArticles.length === 0) {
      console.log("[v0] 네이버 API에서 뉴스를 가져오지 못했습니다. 샘플 데이터를 사용합니다.")
      return generateEnhancedSampleTopics()
    }

    const uniqueMap = new Map<string, NewsArticle>()
    allArticles.forEach((article) => {
      if (!uniqueMap.has(article.title)) {
        uniqueMap.set(article.title, article)
      }
    })
    const uniqueArticles = Array.from(uniqueMap.values())
    console.log(`[v0] 총 ${uniqueArticles.length}개의 고유 항목 추출`)

    return uniqueArticles
  } catch (error) {
    console.error("[v0] 네이버 News API 요청 실패:", error)
    return generateEnhancedSampleTopics()
  }
}

function generateEnhancedSampleTopics(): NewsArticle[] {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const sampleTopics = [
    // 어제 데이터
    {
      title: "한국시리즈 우승팀 확정, 팬들 환호",
      description:
        "어제 한국시리즈 결승 경기에서 극적인 역전승으로 우승팀이 결정되었습니다. 선수들의 감동적인 순간들을 공유하세요.",
      originallink: "https://sports.news",
      source: "스포츠조선",
      pubDate: yesterday.toISOString(),
      category: "스포츠",
    },
    {
      title: "손흥민, 맨체스터 더비에서 결승골",
      description: "토트넘의 손흥민 선수가 경기의 승부를 결정짓는 골을 넣으며 팬들의 환호를 받았습니다.",
      originallink: "#",
      source: "스포츠뉴스",
      pubDate: yesterday.toISOString(),
      category: "스포츠",
    },
    {
      title: "AI 기술이 한국 영화 제작을 주도",
      description:
        "한국 영화계에서도 AI를 활용한 특수효과 제작이 본격화되고 있습니다. 새로운 기술과 창의성의 조화에 대해 이야기해보세요.",
      originallink: "#",
      source: "연예뉴스",
      pubDate: yesterday.toISOString(),
      category: "연예",
    },
    // 오늘 데이터
    {
      title: "서울 신드라마 시즌 - 화제의 작품들",
      description: "이번 시즌 최신 드라마들의 인기 장면과 배우들의 연기력이 화제입니다.",
      originallink: "#",
      source: "연예뉴스",
      pubDate: today.toISOString(),
      category: "연예",
    },
    {
      title: "한국 대학생 기술 창업 증가",
      description: "한국의 대학생들이 스타트업을 창업하는 트렌드가 증가하고 있으며, 교육 방식도 변화하고 있습니다.",
      originallink: "#",
      source: "교육뉴스",
      pubDate: today.toISOString(),
      category: "교육",
    },
    {
      title: "2024년 한국 취업 시장 전망",
      description: "새로운 분야의 일자리 창출과 변화하는 직업 환경에 대해 알아보세요.",
      originallink: "#",
      source: "교육뉴스",
      pubDate: today.toISOString(),
      category: "교육",
    },
    {
      title: "비트코인, 최근 상승 추세 지속",
      description: "암호화폐 시장이 회복세를 보이고 있습니다. 최근 경제 동향을 가볍게 이야기해보세요.",
      originallink: "#",
      source: "경제뉴스",
      pubDate: today.toISOString(),
      category: "경제",
    },
    {
      title: "한국 주식시장, 기술주 중심으로 상승",
      description: "국내 반도체, 바이오 기업들의 실적이 주목받고 있습니다.",
      originallink: "#",
      source: "경제뉴스",
      pubDate: today.toISOString(),
      category: "경제",
    },
    {
      title: "우주 탐사의 새로운 시대",
      description: "한국도 우주 탐사 분야에 본격 진출하며 과학 기술 발전이 주목받고 있습니다.",
      originallink: "#",
      source: "메인뉴스",
      pubDate: today.toISOString(),
      category: "메인뉴스",
    },
    {
      title: "전 세계 AI 기술 경쟁, 한국의 위치",
      description: "글로벌 AI 기술 개발 경쟁에서 한국의 역할과 성과를 살펴보세요.",
      originallink: "#",
      source: "메인뉴스",
      pubDate: today.toISOString(),
      category: "메인뉴스",
    },
  ]
  return sampleTopics
}

export async function GET() {
  try {
    const articles = await fetchNaverNews()

    const filteredTopics = articles.filter((topic) => !isSensitiveContent(topic.title, topic.description || ""))

    const formattedTopics = filteredTopics.map((topic, index) => {
      const cleanTitle = topic.title.replace(/<[^>]*>/g, "")
      const cleanDescription = (topic.description || "").replace(/<[^>]*>/g, "")
      const pubDate = new Date(topic.pubDate)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      const dateLabel =
        pubDate.toDateString() === today.toDateString()
          ? "오늘"
          : pubDate.toDateString() === yesterday.toDateString()
            ? "어제"
            : "이전"

      const category = topic.category || "메인뉴스"

      return {
        id: index + 1,
        category: category,
        title: cleanTitle,
        description: cleanDescription,
        source: topic.source,
        url: topic.originallink,
        date: pubDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        dateLabel,
        tags: extractTags(cleanTitle, category),
      }
    })

    const sortedTopics = formattedTopics.sort((a, b) => {
      const dateOrder = { 오늘: 0, 어제: 1, 이전: 2 }
      return (
        (dateOrder[a.dateLabel as keyof typeof dateOrder] || 3) -
        (dateOrder[b.dateLabel as keyof typeof dateOrder] || 3)
      )
    })

    console.log(
      "[v0] 최종 토픽 반환:",
      sortedTopics.slice(0, 50).map((t) => ({ title: t.title, category: t.category })),
    )

    return NextResponse.json(sortedTopics.slice(0, 50))
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json(
      generateEnhancedSampleTopics()
        .filter((topic) => !isSensitiveContent(topic.title, topic.description || ""))
        .map((topic, index) => {
          const pubDate = new Date(topic.pubDate)
          const today = new Date()
          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)

          const dateLabel =
            pubDate.toDateString() === today.toDateString()
              ? "오늘"
              : pubDate.toDateString() === yesterday.toDateString()
                ? "어제"
                : "이전"

          return {
            id: index + 1,
            category: topic.category,
            title: topic.title,
            description: topic.description || "",
            source: topic.source,
            url: topic.originallink,
            date: pubDate.toLocaleDateString("ko-KR"),
            dateLabel,
            tags: extractTags(topic.title, topic.category),
          }
        })
        .slice(0, 50),
    )
  }
}

function extractTags(title: string, category: string): string[] {
  const words = title.split(" ").filter((word) => word.length > 2)
  return words.slice(0, 3)
}
