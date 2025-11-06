import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StockData {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  image: string
}

export default function StockCard({ stock }: { stock: StockData }) {
  const isPositive = stock.changePercent >= 0
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const changeBgColor = isPositive ? "bg-green-50" : "bg-red-50"

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <img
                src={stock.image || "/placeholder.svg"}
                alt={stock.symbol}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <CardTitle className="text-base">{stock.symbol}</CardTitle>
              <CardDescription className="text-sm">{stock.name}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-foreground">${stock.price.toFixed(2)}</span>
            <div className={`text-right px-3 py-1 rounded ${changeBgColor}`}>
              <p className={`text-sm font-semibold ${changeColor}`}>
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}
              </p>
              <p className={`text-xs ${changeColor}`}>
                {isPositive ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* 간단한 차트 표현 */}
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className={isPositive ? "bg-green-600" : "bg-red-600"}
              style={{ width: `${Math.min(Math.abs(stock.changePercent) * 20, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
