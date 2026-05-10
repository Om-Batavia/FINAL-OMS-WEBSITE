import { AlertTriangle, ArrowRight, BarChart3, BadgeCheck, Bell, Camera, CheckCircle, ClipboardList, CreditCard, DatabaseZap, Download, FileText, Gauge, GitBranch, Heart, Home, MessageCircle, Package, Plus, QrCode, Search, Server, ShieldCheck, Sparkles, Trophy, Upload, User, Zap } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

type ProjectKind = 'invoices' | 'altself' | 'lost-found';

const projects: Array<{
  title: string;
  kicker: string;
  problem: string;
  solution: string;
  impact: string;
  role: string;
  kind: ProjectKind;
}> = [
  {
    title: 'Smart Invoices (Smart Kirana)',
    kicker: 'AI for local retail operations',
    problem: "Kirana stores lose time and accuracy when invoice, stock, and expense data stay trapped in paper or WhatsApp images.",
    solution: 'An AI billing and inventory workflow that extracts invoice data, tracks stock movement, and flags restock needs.',
    impact: 'Built for Indian retailers and wholesalers, with mentorship from the Head of Cybersecurity at Microsoft India.',
    role: 'Founder - product, AI workflow, business systems',
    kind: 'invoices'
  },
  {
    title: 'ALTSELF',
    kicker: 'Model routing infrastructure',
    problem: 'Expensive AI models are often used for simple tasks, making products slower and more costly than they need to be.',
    solution: 'A routing layer that chooses a model based on task complexity, expected quality, latency, and cost.',
    impact: 'Designed to help teams keep output quality high while avoiding unnecessary AI spend.',
    role: 'Founder - orchestration logic, product direction',
    kind: 'altself'
  },
  {
    title: 'AI Lost & Found',
    kicker: 'Visual matching for campuses and venues',
    problem: 'Lost item desks rely on manual matching, vague descriptions, and repeated back-and-forth with owners.',
    solution: 'A lightweight matching system that compares item images and metadata, then supports claim flows through QR access.',
    impact: 'Prototype concept for schools, campuses, and high-footfall venues that need faster item recovery.',
    role: 'Builder - matching flow, interface concept, user journey',
    kind: 'lost-found'
  }
];

function SmartInvoicesMockup() {
  return (
    <div className="h-full bg-slate-50 p-4 md:p-6 text-slate-900 flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] gap-4 flex-1 min-h-0">
        <aside className="hidden lg:flex flex-col rounded-2xl bg-slate-900 text-white overflow-hidden">
          <div className="h-14 flex items-center gap-3 px-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">Smart Kirana</span>
          </div>
          <div className="p-3 space-y-1">
            {[
              [Home, 'Dashboard'],
              [Upload, 'Upload Invoice'],
              [Package, 'Inventory'],
              [Gauge, 'Stock'],
              [BarChart3, 'Predictions'],
              [MessageCircle, 'Reorder'],
              [FileText, 'Reports']
            ].map(([Icon, label], index) => {
              const NavIcon = Icon as typeof Home;
              return (
                <div key={label as string} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${index === 1 ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white' : 'text-slate-400'}`}>
                  <NavIcon className="w-4 h-4" />
                  <span>{label as string}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-4 min-w-0">
          <header className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Upload Invoice</p>
              <p className="text-xs text-slate-500">Convert supplier invoices into inventory updates</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-9 w-44 rounded-lg bg-slate-100 flex items-center px-3 text-xs text-slate-400">Search...</div>
              <Bell className="w-5 h-5 text-slate-500" />
            </div>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['Total Products', '547', Package, 'bg-blue-500'],
              ['Total Value', 'Rs 2.4L', BadgeCheck, 'bg-emerald-500'],
              ['Low Stock', '23', AlertTriangle, 'bg-amber-500'],
              ['Invoices', '156', FileText, 'bg-purple-500']
            ].map(([label, value, Icon, color]) => {
              const StatIcon = Icon as typeof Package;
              return (
                <div key={label as string} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-500">{label as string}</p>
                      <p className="text-2xl font-bold mt-1">{value as string}</p>
                      <p className="text-xs text-emerald-600 mt-2">+12 this week</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${color as string} flex items-center justify-center`}>
                      <StatIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.15fr] gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold">Upload New Invoice</p>
                  <p className="text-xs text-slate-500">Vendor: Patel Wholesale</p>
                </div>
                <Upload className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-5 text-center mb-4">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">invoice_march.pdf</p>
                <p className="text-xs text-slate-500">OCR parsed supplier items</p>
              </div>
              <div className="rounded-xl bg-slate-900 text-white p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">Extraction confidence</p>
                  <p className="text-3xl font-bold mt-1">92%</p>
                </div>
                <BadgeCheck className="w-8 h-8 text-emerald-300" />
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <p className="font-semibold">Review Invoice - Patel Wholesale</p>
                <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-1 text-xs">reviewed</span>
              </div>
              <div className="overflow-hidden">
                {[
                  ['Aashirvaad Atta 5kg', '20', 'matched', '96%'],
                  ['Amul Butter 500g', '12', 'matched', '88%'],
                  ['Tata Salt 1kg', '40', 'matched', '91%'],
                  ['Sunfeast Biscuits', '18', 'low stock', '74%']
                ].map(([name, qty, status, confidence]) => (
                  <div key={name} className="grid grid-cols-[1fr_44px_78px_50px] gap-3 items-center px-4 py-3 border-b last:border-b-0 border-slate-100">
                    <p className="text-sm font-medium truncate">{name}</p>
                    <p className="text-sm text-slate-500">{qty}</p>
                    <span className={`rounded-full px-2 py-1 text-[11px] text-center ${status === 'low stock' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {status}
                    </span>
                    <p className="text-sm font-medium text-emerald-600">{confidence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 xl:col-span-2 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold">ML Demand Forecast</p>
                  <p className="text-xs text-slate-500">Predicted demand vs current stock</p>
                </div>
                <span className="text-xs text-emerald-600 font-medium">AI-powered</span>
              </div>
              <div className="flex items-end gap-3 h-28">
                {[
                  ['Atta', 72, 52],
                  ['Milk', 92, 64],
                  ['Salt', 46, 80],
                  ['Maggi', 84, 48],
                  ['Parle-G', 68, 58],
                  ['Rice', 56, 35]
                ].map(([label, demand, stock]) => (
                  <div key={label as string} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-1 h-20">
                      <span className="w-3 rounded-t bg-blue-500" style={{ height: `${demand as number}%` }} />
                      <span className="w-3 rounded-t bg-emerald-500" style={{ height: `${stock as number}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500">{label as string}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp Reorder</p>
                  <p className="text-xs text-slate-500">Generated by supplier</p>
                </div>
              </div>
              <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-slate-700">
                <p className="font-medium mb-2">Reorder request</p>
                <p>- Amul Butter - 25 units</p>
                <p>- Basmati Rice - 18 units</p>
                <p>- Sunfeast Biscuits - 30 units</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AltselfMockup() {
  return (
    <div className="h-full bg-black p-4 md:p-6 text-white flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-4 flex-1 min-h-0">
        <aside className="hidden lg:flex flex-col rounded-2xl bg-[#101014] border border-white/10 overflow-hidden">
          <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">ALTSELF</span>
            </div>
          </div>
          <div className="p-3 border-b border-white/10">
            <div className="rounded-lg bg-white/5 px-3 py-2 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              New Chat
            </div>
          </div>
          <div className="px-3 py-3 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2">Quick actions</p>
            {['Competitive Brief', 'Vendor Memo', 'Market Brief', 'Labs Deck'].map((item, index) => (
              <div key={item} className={`rounded-lg px-3 py-2 text-xs ${index === 0 ? 'bg-white/10 text-white' : 'text-zinc-500'}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="min-h-0 flex-1 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2">Saved chats</p>
            {['Retail AI research', 'Vendor memo', 'Pitch deck'].map((item, index) => (
              <div key={item} className={`rounded-lg px-3 py-2 text-xs ${index === 0 ? 'bg-violet-500/20 text-white' : 'text-zinc-500'}`}>
                <span className="block truncate">{item}</span>
                <span className="text-[10px] text-zinc-600">{index + 3} messages</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 space-y-1">
            {[
              [User, 'Log in'],
              [Package, 'Marketplace'],
              [CreditCard, 'Billing Usage'],
              [FileText, 'Documents'],
              [Server, 'Admin'],
              [Gauge, 'Settings']
            ].map(([Icon, label]) => {
              const NavIcon = Icon as typeof User;
              return (
                <div key={label as string} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500">
                  <NavIcon className="w-4 h-4" />
                  <span>{label as string}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="min-w-0 rounded-2xl bg-black border border-white/10 overflow-hidden flex flex-col">
          <header className="border-b border-white/10 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-white text-black flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">ALTSELF Briefs</p>
                <p className="text-xs text-zinc-500">Reviewed business research runs.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">Approval required</span>
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">Trace recorded</span>
              <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-emerald-300">Labs online</span>
            </div>
          </header>

          <div className="p-4 md:p-5 flex flex-col gap-4">
            <section className="grid gap-4 xl:grid-cols-[1fr_300px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 mb-3">
                  <ClipboardList className="w-4 h-4 text-emerald-300" />
                  Approval-gated business brief
                </div>
                <h4 className="text-3xl md:text-4xl font-medium leading-tight mb-3">Research plan first. Execution second.</h4>
                <p className="text-sm text-zinc-400 max-w-xl mb-4">
                  ALTSELF creates a reviewable plan, waits for approval, then returns a decision-ready brief with an execution trail.
                </p>
                <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                  <p className="text-sm text-zinc-300 mb-3">Create a competitive brief on our top three alternatives with risks and next moves.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">COPILOT - BALANCED - document export ready</span>
                    <span className="rounded-lg bg-white text-black px-3 py-2 text-xs font-medium">Send</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-3">Execution summary</p>
                <div className="space-y-3">
                  {[
                    ['Mode', 'COPILOT'],
                    ['Tasks', '4 specialists'],
                    ['Est. cost', '$0.18'],
                    ['Status', 'Awaiting approval']
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                ['@Signal', DatabaseZap, 'Finds context and provider fit.', 'text-emerald-300'],
                ['@Plan', GitBranch, 'Splits work into execution steps.', 'text-blue-300'],
                ['@Verify', ShieldCheck, 'Reviews claims and risks.', 'text-violet-300'],
                ['@Brief', FileText, 'Turns the run into exports.', 'text-amber-300']
              ].map(([name, Icon, brief, color], index) => {
                const LaneIcon = Icon as typeof DatabaseZap;
                return (
                  <div key={name as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <LaneIcon className={`w-5 h-5 ${color as string}`} />
                      <span className={`w-2 h-2 rounded-full ${index < 2 ? 'bg-emerald-300' : 'bg-zinc-600'}`} />
                    </div>
                    <p className="font-medium text-sm">{name as string}</p>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{brief as string}</p>
                  </div>
                );
              })}
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_330px]">
              <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                <p className="text-sm font-medium mb-4">Transcript</p>
                <div className="space-y-3">
                  <div className="rounded-xl bg-white/[0.04] p-3 text-sm text-zinc-300">
                    User: Compare two vendors for this workflow and produce a decision memo.
                  </div>
                  <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-3 text-sm">
                    Plan ready. Review tasks, assumptions, model choices, and estimated cost before execution.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Download className="w-4 h-4" />
                    PPTX / DOCX export available after run
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Plan review</p>
                  <span className="rounded-full bg-amber-400/10 text-amber-300 px-2 py-1 text-xs">approval</span>
                </div>
                {[
                  ['signal_01', 'gpt-4.1-mini'],
                  ['plan_02', 'claude-sonnet'],
                  ['verify_03', 'gpt-4.1'],
                  ['brief_04', 'o3']
                ].map(([task, model]) => (
                  <div key={task} className="flex items-center justify-between gap-3 py-2 border-b last:border-b-0 border-white/10">
                    <span className="text-xs text-zinc-400">{task}</span>
                    <span className="text-xs rounded-md bg-white/5 px-2 py-1 text-zinc-300">{model}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function LostFoundMockup() {
  return (
    <div className="h-full bg-[#0a0a0f] p-4 md:p-6 text-white flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wide">LOST & FOUND</p>
            <p className="text-xs text-white/40">AI-powered recovery dashboard</p>
          </div>
        </div>
        <Bell className="w-5 h-5 text-white/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] gap-4 flex-1 min-h-0">
        <aside className="hidden lg:flex flex-col gap-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-3">Quick actions</p>
            <div className="space-y-2">
              <div className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Lost
              </div>
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-xs font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Report Found
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-2 space-y-1">
            {[
              [Home, 'Dashboard'],
              [Search, 'Lost Items'],
              [Package, 'Found Items'],
              [Heart, 'Discover'],
              [Sparkles, 'Matches'],
              [QrCode, 'My QR Code'],
              [Trophy, 'Leaderboard']
            ].map(([Icon, label], index) => {
              const NavIcon = Icon as typeof Home;
              return (
                <div key={label as string} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${index === 4 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-white/50'}`}>
                  <NavIcon className="w-4 h-4" />
                  <span>{label as string}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-2xl font-bold">Matches</p>
              <p className="text-sm text-white/45">Review and manage item matches</p>
            </div>
            <div className="flex gap-2">
              {['All', 'Pending', 'Resolved'].map((filter, index) => (
                <span key={filter} className={`rounded-lg px-3 py-2 text-xs font-medium ${index === 1 ? 'bg-white text-[#0a0a0f]' : 'bg-white/5 text-white/55 border border-white/10'}`}>
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['Lost Items', '14', Search, 'from-red-500 to-red-600'],
              ['Found Items', '22', Package, 'from-blue-500 to-blue-600'],
              ['Pending', '6', AlertTriangle, 'from-amber-500 to-orange-500'],
              ['Resolved', '18', CheckCircle, 'from-emerald-500 to-green-500']
            ].map(([label, value, Icon, gradient]) => {
              const StatIcon = Icon as typeof Search;
              return (
                <div key={label as string} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/45">{label as string}</p>
                      <p className="text-3xl font-bold mt-1">{value as string}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient as string} flex items-center justify-center`}>
                      <StatIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <BrainIcon />
              </div>
              <div>
                <p className="font-medium">AI Analysis Complete</p>
                <p className="text-xs text-white/40">Powered by MobileNet fallback and production AI hooks</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Object', 'Blue bottle'],
                ['Category', 'Accessories'],
                ['Color', 'Blue']
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-black/30 p-3 text-center">
                  <p className="text-[10px] text-white/40 mb-1">{label}</p>
                  <p className="text-sm font-medium truncate">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-slate-900">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="flex-1 rounded-xl bg-red-50 p-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Lost Item</p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-red-100 flex items-center justify-center">
                    <Search className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Blue water bottle</p>
                    <p className="text-xs text-slate-500">Library - Navy</p>
                  </div>
                </div>
              </div>
              <div className="md:w-24 text-center">
                <p className="text-2xl font-bold text-green-600">86%</p>
                <p className="text-xs text-slate-500">Confidence</p>
              </div>
              <div className="flex-1 rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Found Item</p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bottle near cafeteria</p>
                    <p className="text-xs text-slate-500">Detected: Blue</p>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col gap-2">
                <span className="flex-1 md:flex-none rounded-lg bg-green-600 text-white px-3 py-2 text-xs text-center font-medium">Accept</span>
                <span className="flex-1 md:flex-none rounded-lg bg-red-100 text-red-700 px-3 py-2 text-xs text-center font-medium">Reject</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainIcon() {
  return (
    <Camera className="w-5 h-5" />
  );
}

function ProjectMockup({ kind }: { kind: ProjectKind }) {
  if (kind === 'invoices') return <SmartInvoicesMockup />;
  if (kind === 'altself') return <AltselfMockup />;
  return <LostFoundMockup />;
}

function ProjectPreview({ kind }: { kind: ProjectKind }) {
  return (
    <div className="project-preview-frame">
      <div className="project-preview-scale">
        <ProjectMockup kind={kind} />
      </div>
    </div>
  );
}

function ProjectItem({ project }: { project: typeof projects[0] }) {
  const ref = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <article ref={ref} className="w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-6 lg:gap-10 items-start">
      <div className="flex flex-col gap-8 rounded-[32px] bg-white dark:bg-[#0D212C] border border-gray-100 dark:border-white/10 p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-none">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#273C46]/60 dark:text-[#E0EBF0]/60 mb-4">{project.kicker}</p>
          <h3 className="font-['PP_Mondwest'] text-3xl md:text-4xl font-semibold text-[#051A24] dark:text-white leading-none">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-col gap-5">
          {[
            ['Problem', project.problem],
            ['Solution', project.solution],
            ['Impact', project.impact],
            ['Role', project.role]
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#273C46]/60 dark:text-[#E0EBF0]/60 mb-2">{label}</p>
              <p className="text-sm md:text-base text-[#051A24] dark:text-[#E0EBF0] leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">
          Talk about this kind of build
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="overflow-hidden rounded-[32px] shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10">
        <ProjectPreview kind={project.kind} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16 pb-28 flex flex-col gap-10 md:gap-12">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#273C46]/60 dark:text-[#E0EBF0]/60 mb-4">
          Selected work
        </p>
        <h2 className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white leading-none">
          Projects with a problem to solve.
        </h2>
      </div>
      {projects.map((project) => (
        <ProjectItem key={project.title} project={project} />
      ))}
    </section>
  );
}
