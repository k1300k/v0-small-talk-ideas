"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  source: string
  date: string
  category: string
  url?: string
}

interface NewsCardProps {
  article: NewsArticle
  onTagClick?: (tag: string) => void
  showImages?: boolean
}

export default function NewsCard({ article, onTagClick, showImages = true }: NewsCardProps) {
  const articleUrl = article.url || `https://www.google.com/search?q=${encodeURIComponent(article.title)}`

  return (
    <Link href={articleUrl} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer hover:scale-105 transition-transform">
        {showImages && (
          <div className="relative h-48 w-full bg-muted overflow-hidden">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                onTagClick?.(article.source)
              }}
              className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors cursor-pointer"
            >
              {article.source}
            </button>
            <span className="text-xs text-muted-foreground">{article.date}</span>
          </div>
          <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">{article.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
