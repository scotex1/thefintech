import Link from "next/link"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Reviews — FinVest Pro", description: "See what Indian investors say about FinVest Pro." }
const REVIEWS = [
  { name:"Priya Sharma", role:"Software Engineer, Bangalore", rating:5, text:"Finally an app that explains risk in plain English. My SIP is now goal-based, not random. The milestone tracker keeps me motivated.", avatar:"PS", plan:"Pro" },
  { name:"Rahul Gupta", role:"CA, Mumbai", rating:5, text:"As a CA, I was skeptical. But the retirement calculator is more accurate than what I calculate manually. The inflation adjustment is perfect.", avatar:"RG", plan:"Elite" },
  { name:"Anita Verma", role:"Teacher, Delhi", rating:5, text:"Used the goal planner for my daughter education fund. It gave me a clear SIP plan with monthly milestones. Highly recommended.", avatar:"AV", plan:"Basic" },
  { name:"Vikram Singh", role:"Entrepreneur, Pune", rating:5, text:"The global event engine warned me about RBI rate hike impact on my debt funds 2 days before. Incredible feature.", avatar:"VS", plan:"Pro" },
  { name:"Meera Iyer", role:"Doctor, Chennai", rating:5, text:"I never understood portfolio allocation until this app. The risk profiler nailed my profile exactly.", avatar:"MI", plan:"Pro" },
  { name:"Arjun Nair", role:"IT Manager, Hyderabad", rating:4, text:"Stock analysis engine saves me hours of research. The fundamental + technical combo is unique in India.", avatar:"AN", plan:"Elite" },
]
export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#060A0F] text-[#F0F4F8]">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/home" className="flex items-center gap-2 font-bold">📈 Finvest<span className="text-[#C9A84C]">Pro</span></Link>
        <Link href="/auth/signup" className="px-4 py-2 bg-[#C9A84C] text-[#060A0F] text-sm font-semibold rounded-lg hover:bg-[#E4C06A] transition-colors">Get Started</Link>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">What Investors Say</h1>
          <p className="text-[#8A9BB0]">Trusted by thousands of Indian investors</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {"★★★★★".split("").map((s,i)=><span key={i} className="text-[#C9A84C] text-2xl">{s}</span>)}
            <span className="text-[#8A9BB0] text-sm ml-2">4.9 / 5 average</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(r=>(
            <div key={r.name} className="bg-[#111820] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({length:r.rating}).map((_,i)=><span key={i} className="text-[#C9A84C]">★</span>)}
                {Array.from({length:5-r.rating}).map((_,i)=><span key={i} className="text-[#4A5568]">★</span>)}
              </div>
              <p className="text-sm text-[#8A9BB0] leading-relaxed mb-5 italic flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-xs font-bold text-[#C9A84C]">{r.avatar}</div>
                  <div><p className="font-medium text-sm">{r.name}</p><p className="text-xs text-[#8A9BB0]">{r.role}</p></div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[rgba(201,168,76,0.1)] text-[#C9A84C] border border-[rgba(201,168,76,0.2)]">{r.plan}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/auth/signup" className="inline-block px-8 py-3 bg-[#C9A84C] text-[#060A0F] font-bold rounded-xl hover:bg-[#E4C06A] transition-all">Join Thousands of Investors</Link>
        </div>
      </div>
    </div>
  )
}