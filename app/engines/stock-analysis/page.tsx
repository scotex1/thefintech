"use client"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { hasAccess } from "@/lib/utils"
import { apiClient } from "@/lib/api"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Badge from "@/components/ui/Badge"
import Link from "next/link"
import toast from "react-hot-toast"

const VERDICTS: Record<string,{color:string;badge:string;bg:string}> = {
  "STRONG BUY": { color:"var(--green)",  badge:"green",  bg:"var(--green-dim)" },
  "BUY":        { color:"var(--green)",  badge:"green",  bg:"var(--green-dim)" },
  "HOLD":       { color:"var(--gold)",   badge:"gold",   bg:"var(--gold-dim)"  },
  "SELL":       { color:"var(--red)",    badge:"red",    bg:"var(--red-dim)"   },
  "STRONG SELL":{ color:"var(--red)",    badge:"red",    bg:"var(--red-dim)"   },
}

export default function StockAnalysisPage() {
  const { plan, planExpiry } = useAuth()
  const access = hasAccess("stock-analysis", plan, planExpiry)
  const [symbol, setSymbol] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  if (!access) return (
    <div className="max-w-lg mx-auto text-center py-20 fade-up">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="title-lg mb-2">Pro Plan Required</h2>
      <p className="body-sm mb-6">Upgrade to Pro to access AI Stock Analysis.</p>
      <Link href="/pricing"><Button size="lg">Upgrade to Pro</Button></Link>
    </div>
  )

  const analyze = async () => {
    if (!symbol.trim()) { toast.error("Enter a stock symbol"); return }
    setLoading(true)
    setResult(null)
    try {
      const res = await apiClient.analyzeStock({ symbol: symbol.toUpperCase().trim() })
      setResult(res.data)
    } catch (err: any) {
      toast.error(err.message || "Analysis failed. Check the symbol and try again.")
    } finally { setLoading(false) }
  }

  const v = result?.verdict ? (VERDICTS[result.verdict] || VERDICTS["HOLD"]) : null
  const changePositive = (result?.change_pct || 0) >= 0

  return (
    <div className="max-w-5xl mx-auto fade-up">
      <div className="mb-8">
        <Badge variant="gold" className="mb-3">📈 Pro Engine</Badge>
        <h1 className="display-md mb-2">Stock Analysis AI</h1>
        <p className="body-md">Fundamental + technical AI analysis for NSE/BSE listed stocks.</p>
      </div>

      <Card className="mb-6">
        <div className="flex gap-3">
          <Input
            placeholder="Enter NSE/BSE symbol — e.g. RELIANCE, TCS, HDFCBANK"
            value={symbol}
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && analyze()}
            className="flex-1 mono"
          />
          <Button onClick={analyze} loading={loading} size="md" className="shrink-0">Analyze</Button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {["RELIANCE","TCS","INFY","HDFCBANK","WIPRO","ICICIBANK","BAJFINANCE"].map(s => (
            <button key={s} onClick={() => { setSymbol(s); }} className="badge badge-gray hover:badge-gold cursor-pointer transition-all" style={{ fontSize:"0.75rem" }}>{s}</button>
          ))}
        </div>
      </Card>

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => <div key={i} className="surface p-6 h-36 skeleton rounded-2xl"/>)}
        </div>
      )}

      {result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-in">
          {/* Header */}
          <Card gold className="lg:col-span-2">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="display-md mono">{result.symbol}</h2>
                  <Badge variant={v?.badge || "gray"}>{result.verdict}</Badge>
                </div>
                <p className="body-sm">{result.name}</p>
                <p className="caption">{result.exchange} · {result.sector || "Equity"}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold mono">₹{result.price?.toLocaleString("en-IN")}</p>
                <p className="text-sm mono font-medium" style={{ color: changePositive ? "var(--green)" : "var(--red)" }}>
                  {changePositive ? "▲" : "▼"} {Math.abs(result.change || 0).toFixed(2)} ({Math.abs(result.change_pct || 0).toFixed(2)}%)
                </p>
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label:"P/E Ratio",    value: result.pe?.toFixed(1) || "—" },
                { label:"P/B Ratio",    value: result.price_to_book?.toFixed(2) || "—" },
                { label:"ROE",          value: result.roe ? `${result.roe.toFixed(1)}%` : "—" },
                { label:"D/E Ratio",    value: result.de?.toFixed(2) || "—" },
                { label:"52W High",     value: result.week_52_high ? `₹${result.week_52_high.toLocaleString("en-IN")}` : "—" },
                { label:"52W Low",      value: result.week_52_low  ? `₹${result.week_52_low.toLocaleString("en-IN")}`  : "—" },
                { label:"Mkt Cap",      value: result.mcap || "—" },
                { label:"Div. Yield",   value: result.dividend_yield ? `${result.dividend_yield.toFixed(1)}%` : "—" },
              ].map(m => (
                <div key={m.label} className="p-3 rounded-xl text-center" style={{ background:"var(--bg-overlay)", border:"1px solid var(--border-2)" }}>
                  <p className="caption mb-0.5">{m.label}</p>
                  <p className="mono font-semibold text-sm">{m.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Verdict */}
          <div className="flex flex-col gap-4">
            <Card>
              <p className="label mb-3">AI Verdict</p>
              <div className="text-center py-6 rounded-xl mb-4" style={{ background: v?.bg }}>
                <p className="text-3xl font-bold" style={{ color: v?.color }}>{result.verdict}</p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label:"RSI",      value:`${result.rsi} — ${result.rsi_signal}` },
                  { label:"MACD",     value: result.macd },
                  { label:"MA50",     value: result.ma50 },
                  { label:"MA200",    value: result.ma200 },
                  { label:"Momentum", value: result.momentum },
                ].map(m => (
                  <div key={m.label} className="flex justify-between text-sm py-1.5" style={{ borderBottom:"1px solid var(--border-2)" }}>
                    <span className="caption">{m.label}</span>
                    <span className="font-medium text-xs" style={{ color:"var(--text-1)" }}>{m.value || "—"}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.revenue_growth !== undefined && (
              <Card>
                <p className="label mb-3">Growth Metrics</p>
                {[
                  { label:"Revenue Growth",  value: result.revenue_growth ? `${result.revenue_growth.toFixed(1)}%` : "—", positive: (result.revenue_growth || 0) > 0 },
                  { label:"Profit Growth",   value: result.profit_growth  ? `${result.profit_growth.toFixed(1)}%`  : "—", positive: (result.profit_growth  || 0) > 0 },
                  { label:"Profit Margin",   value: result.profit_margin  ? `${result.profit_margin.toFixed(1)}%`  : "—", positive: (result.profit_margin  || 0) > 10 },
                  { label:"EPS",             value: result.eps            ? `₹${result.eps.toFixed(2)}`           : "—", positive: (result.eps            || 0) > 0 },
                ].map(m => (
                  <div key={m.label} className="flex justify-between text-sm py-1.5" style={{ borderBottom:"1px solid var(--border-2)" }}>
                    <span className="caption">{m.label}</span>
                    <span className="mono font-semibold text-xs" style={{ color: m.positive ? "var(--green)" : "var(--red)" }}>{m.value}</span>
                  </div>
                ))}
              </Card>
            )}
          </div>

          {/* AI Summary */}
          {result.ai_summary && (
            <Card className="lg:col-span-3">
              <p className="label mb-3">AI Analysis Summary</p>
              <p className="body-md leading-relaxed">{result.ai_summary}</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}