import React from 'react';
import { BrainCircuit, ChevronDown, Lightbulb, MessageSquare, Mic2, Rocket, Store } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TEC_TEEN_SHOP_URL = 'https://tecteenshop.com/';

interface ExperienceItem {
  company: React.ReactNode;
  role: string;
  dates: string;
  description: React.ReactNode[];
  lane: string;
  icon: React.ElementType;
  accent: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "ALTSELF",
    role: "Founder",
    dates: "Apr 2026 - Present",
    lane: "AI infrastructure",
    icon: BrainCircuit,
    accent: "from-sky-200 to-indigo-200 dark:from-sky-500/20 dark:to-indigo-500/20",
    description: ["Building ALTSELF, a routing layer that selects AI models by task complexity, quality, latency, and cost."]
  },
  {
    company: "The Riverside School",
    role: "Innovation Team Member",
    dates: "Aug 2025 - Oct 2025",
    lane: "Student innovation",
    icon: Lightbulb,
    accent: "from-lime-200 to-teal-200 dark:from-lime-500/20 dark:to-teal-500/20",
    description: [
      "Planned school-wide events and inter-school competitions focused on innovation and learning.",
      "Taught and mentored students on artificial intelligence concepts and practical applications.",
    ]
  },
  {
    company: "Smart Kirana (Smart Invoices)",
    role: "Founder",
    dates: "Jun 2025 - Present",
    lane: "Local business AI",
    icon: Store,
    accent: "from-emerald-200 to-cyan-200 dark:from-emerald-500/20 dark:to-cyan-500/20",
    description: [
      "Built and deployed Smart Invoices, an inventory system for Indian retailers and wholesalers, using FastAPI, React, and PostgreSQL.",
      "Added invoice extraction, product matching, low-stock reports, and purchase summaries.",
      "Received mentorship from the Head of Cybersecurity at Microsoft India."
    ]
  },
  {
    company: "The Riverside School",
    role: "Music Club President",
    dates: "Jan 2024 - Present",
    lane: "Creative leadership",
    icon: Mic2,
    accent: "from-fuchsia-200 to-rose-200 dark:from-fuchsia-500/20 dark:to-rose-500/20",
    description: [
      "Lead the music club and help organize student performances and rehearsals.",
    ]
  },
  {
    company: "The Riverside School",
    role: "Debate Club President",
    dates: "Jan 2022 - Present",
    lane: "Communication",
    icon: MessageSquare,
    accent: "from-amber-200 to-orange-200 dark:from-amber-500/20 dark:to-orange-500/20",
    description: [
      "Lead debate club discussions and help students prepare for inter-school participation.",
    ]
  }
];

const growthProgression = [
  {

    role: "Chief Executive Officer & Co-founder",
    org: "TEC Teen Shop",
    dates: "Mar 2026 - Present",
    detail: "Lead TEC Teen Shop after serving as Head of Sourcing and Shipping. Contributed to operations supporting more than 200 completed orders."
  },
  {
    role: "Head of Sourcing and Shipping",
    org: "TEC Teen Shop",
    dates: "Jun 2025 - Present",
    detail: "Built supplier networks, negotiated vendor terms, and set up sourcing processes."
  },
  {
    role: "Team Lead",
    org: "Growth Valley Community",
    dates: "Apr 2025 - Present",
    detail: "Led 15 peers across multiple projects at Growth Valley Community."
  },
  {    role: "Intern",
    org: "Growth Valley Community",
    dates: "Feb 2025 - Present",
    detail: "Contributed to AI and startup projects."
  }
];

const education = [
  { school: "The Riverside School, Ahmedabad", dates: "2021 - 2027" },
  { school: "Good Shepherd International School", dates: "Jan 2018 - Mar 2021" },
  { school: "Eklavya School, Ahmedabad", dates: "Jan 2012 - Dec 2018" }
];

const skills = [
  "Python", "FastAPI", "React", "PostgreSQL", "SQLAlchemy", "Git", "Teaching",
  "Supplier Sourcing", "Vendor Negotiation", "Team Leadership",
  "Public Speaking", "Debate", "Event Planning"
];

export function ResumeSection() {
  const refHeader = useInViewAnimation<HTMLHeadingElement>(0.1);
  const refSummary = useInViewAnimation<HTMLDivElement>(0.1);
  const refExp = useInViewAnimation<HTMLDivElement>(0.1);
  const refEdu = useInViewAnimation<HTMLDivElement>(0.1);
  const refSkills = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section id="about" className="w-full py-24 px-6 bg-gray-50 dark:bg-[#051A24] border-t border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 ref={refHeader} className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white mb-12">
          Experience & Resume
        </h2>

        {/* Summary */}
        <div ref={refSummary} className="mb-20 text-base md:text-lg text-[#051A24] dark:text-[#E0EBF0] leading-relaxed">
          <p>
            Om Batavia is a student at <a href="https://schoolriverside.com/" className="underline underline-offset-4">The Riverside School in Ahmedabad</a>, founder of ALTSELF and Smart Invoices, and CEO of TEC Teen Shop. His work combines AI projects, student leadership, and practical business experience.
          </p>
          <h3 className="mt-8 mb-4 text-xl font-semibold">Student leadership at Riverside</h3>
          <p>
            As Music Club President and Debate Club President, Om helps organize performances, rehearsals, and debate preparation. During his time on the Innovation Team in 2025, he helped plan school events and inter-school competitions and taught students about AI.
          </p>
          <p className="mt-4">
            Beyond school, he has led 15 peers at Growth Valley Community and built AI workflows for model routing and invoice processing. Explore <a href="/projects/altself/" className="underline underline-offset-4">ALTSELF</a> and <a href="/projects/smart-invoices/" className="underline underline-offset-4">Smart Invoices</a> for the problems, solutions, and his role in each project.
          </p>
          <p className="mt-6 text-sm">
            In its <a href="https://www.linkedin.com/posts/growthvalleycommunity_growthvalley-tec-tecteenshop-activity-7458438090014236672-v45v" className="underline underline-offset-4">TEC Teen Shop leadership feature</a>, Growth Valley Community identifies Om as a Grade 12 student at Riverside and an Intern CEO of its student-run business.
          </p>
        </div>

        {/* Experience Timeline */}
        <div ref={refExp} className="mb-20">
          <h3 className="text-sm font-mono text-[#273C46] dark:text-[#E0EBF0] mb-8 uppercase tracking-widest border-b border-gray-200 dark:border-white/20 pb-4">Experience</h3>

          <div className="relative overflow-hidden rounded-[32px] bg-[#051A24] text-white shadow-2xl shadow-[#051A24]/20 dark:shadow-black/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(167,243,208,0.18),transparent_30%)]" />
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55 mb-3">Current and recent roles</p>
                  <h4 className="font-['PP_Mondwest'] text-[36px] md:text-[52px] leading-none">
                    Building and leading.
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Founder: ALTSELF</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Founder: Smart Invoices</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Growth Valley Team Lead</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">TEC Teen Shop CEO</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {experiences.map((exp, i) => {
                  const Icon = exp.icon;
                  const spanClass = i < 2 ? 'md:col-span-3' : 'md:col-span-2';
                  return (
                    <article
                      key={`${exp.company}-${exp.role}`}
                      className={`group rounded-3xl bg-gradient-to-br ${exp.accent} border border-white/15 p-5 text-[#051A24] dark:text-white ${spanClass} min-h-[280px] flex flex-col`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-8">
                        <div className="rounded-2xl bg-white/80 dark:bg-white/10 border border-white/40 p-3">
                          <Icon size={22} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">{exp.lane}</span>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm opacity-70">{exp.role}</p>
                        <h5 className="text-xl font-semibold mt-1">{exp.company}</h5>
                        <p className="text-xs opacity-60 mt-2">{exp.dates}</p>
                        <ul className="mt-5 flex list-disc flex-col gap-2 pl-4">
                          {exp.description.map((desc, j) => (
                            <li key={j} className="text-sm leading-relaxed opacity-75">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  );
                })}

                <details className="group rounded-3xl bg-white text-[#051A24] md:col-span-6 border border-white/30 shadow-xl shadow-black/10 overflow-hidden">
                  <summary className="list-none cursor-pointer p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[#051A24] text-white">
                        <Rocket size={22} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#051A24]/70 mb-2">Business experience</p>
                        <h5 className="text-xl font-semibold">Growth Valley + TEC Teen Shop</h5>
                        <p className="text-sm text-[#273C46] mt-1">Team Lead at Growth Valley and CEO at TEC Teen Shop</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="rounded-full bg-[#051A24] px-3 py-1 text-xs font-medium text-white">
                            Growth Valley Team Lead
                          </span>
                          <span className="rounded-full bg-[#051A24] px-3 py-1 text-xs font-medium text-white">
                            TEC Teen Shop CEO
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#051A24]/10 px-4 py-2 text-sm transition-colors group-open:bg-[#051A24] group-open:text-white">
                      <span className="group-open:hidden">View experience</span>
                      <span className="hidden group-open:inline">Hide experience</span>
                      <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                    </span>
                  </summary>

                  <div className="px-5 md:px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {growthProgression.map((item, index) => (
                        <div key={`${item.org}-${item.role}`} className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-4">
                          <div className="absolute right-4 top-4 font-['PP_Mondwest'] text-5xl text-[#051A24]/5">
                            0{index + 1}
                          </div>
                          <p className="text-sm font-semibold relative">{item.role}</p>
                          <p className="text-sm text-[#273C46] mt-1 relative">{item.org}</p>
                          <p className="text-xs text-[#273C46]/60 mt-1 relative">{item.dates}</p>
                          <p className="text-sm text-[#051A24]/70 mt-4 leading-relaxed relative">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                    <a href={TEC_TEEN_SHOP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex mt-5 text-sm font-medium text-[#051A24] hover:underline underline-offset-2">
                      View TEC Teen Shop
                    </a>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Education */}
          <div ref={refEdu}>
            <h3 className="text-sm font-mono text-[#273C46] dark:text-[#E0EBF0] mb-8 uppercase tracking-widest border-b border-gray-200 dark:border-white/20 pb-4">Education</h3>
            <div className="flex flex-col gap-6 mb-10">
              {education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-medium text-[#051A24] dark:text-white">{edu.school}</h4>
                  <p className="text-sm text-[#273C46] dark:text-[#E0EBF0] mt-1">{edu.dates}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Interests */}
          <div ref={refSkills}>
            <h3 className="text-sm font-mono text-[#273C46] dark:text-[#E0EBF0] mb-8 uppercase tracking-widest border-b border-gray-200 dark:border-white/20 pb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-white dark:bg-[#0D212C] border border-gray-200 dark:border-white/20 rounded-full text-sm text-[#051A24] dark:text-white shadow-sm dark:shadow-none">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
