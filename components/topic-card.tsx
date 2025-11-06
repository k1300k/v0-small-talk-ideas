import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

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

interface TopicCardProps {
  topic: Topic
}

const CATEGORY_COLORS: Record<string, { bg: string; badge: string; icon: string }> = {
  연예: { bg: "from-pink-100 to-rose-100", badge: "bg-pink-100 text-pink-700", icon: "🎬" },
  스포츠: { bg: "from-blue-100 to-cyan-100", badge: "bg-blue-100 text-blue-700", icon: "⚽" },
  교육: { bg: "from-green-100 to-emerald-100", badge: "bg-green-100 text-green-700", icon: "📚" },
  경제: { bg: "from-amber-100 to-orange-100", badge: "bg-amber-100 text-amber-700", icon: "💰" },
  메인뉴스: { bg: "from-purple-100 to-indigo-100", badge: "bg-purple-100 text-purple-700", icon: "📰" },
}

const DATE_LABEL_COLORS: Record<string, string> = {
  오늘: "bg-blue-500 text-white",
  어제: "bg-slate-500 text-white",
  이전: "bg-slate-300 text-slate-700",
}

export default function TopicCard({ topic }: TopicCardProps) {
  const categoryStyle = CATEGORY_COLORS[topic.category] || CATEGORY_COLORS["메인뉴스"]
  const dateStyle = DATE_LABEL_COLORS[topic.dateLabel] || DATE_LABEL_COLORS["이전"]

  return (
    <Card
      className={`bg-gradient-to-br ${categoryStyle.bg} border-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryStyle.icon}</span>
            <Badge className={`${categoryStyle.badge} border-0 font-medium`}>{topic.category}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-bold ${dateStyle}`}>{topic.dateLabel}</span>
            <span className="text-slate-500 text-xs whitespace-nowrap">{topic.date}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">{topic.title}</h3>

        <p className="text-slate-700 text-sm mb-4 flex-grow line-clamp-3">{topic.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topic.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-white/60 text-slate-700 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/30">
          <span className="text-xs text-slate-600 font-medium">{topic.source}</span>
          <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  )
}
