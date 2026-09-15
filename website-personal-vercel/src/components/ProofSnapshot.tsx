import { Award, BrainCircuit, Building2, GraduationCap } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const proofItems = [
  {
    icon: Building2,
    value: '3',
    label: 'Founder & co-founder roles',
    detail: 'ALTSELF, Smart Invoices, TEC Teen Shop'
  },
  {
    icon: BrainCircuit,
    value: '200+',
    label: 'Orders completed by TEC Teen Shop',
    detail: 'Contributed to sourcing, shipping, and operations'
  },
  {
    icon: Award,
    value: '5',
    label: 'Programs and certificates',
    detail: 'Ashoka, Blue Ocean, Clever Harvey, Growth Valley'
  },
  {
    icon: GraduationCap,
    value: '200+',
    label: 'Students reached by Jumpstart',
    detail: 'Led the initiative and helped design its digital skills curriculum'
  }
];

export function ProofSnapshot() {
  const ref = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="max-w-6xl mx-auto rounded-[32px] bg-[#051A24] dark:bg-white text-white dark:text-[#051A24] p-6 md:p-8 shadow-[0_18px_50px_rgba(5,26,36,0.14)] dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 dark:text-[#051A24]/60 mb-3">
              Proof snapshot
            </p>
            <h2 className="font-['PP_Mondwest'] text-[34px] md:text-[48px] leading-none">
              Projects, roles, and experience.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/70 dark:text-[#051A24]/70 leading-relaxed">
            A compact view of the work, programs, and community projects behind the portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-white/10 dark:border-[#051A24]/10 bg-white/8 dark:bg-[#051A24]/5 p-5">
                <Icon className="w-5 h-5 mb-5 text-white/80 dark:text-[#051A24]/80" />
                <div className="text-3xl font-medium mb-2">{item.value}</div>
                <div className="text-sm font-medium mb-2">{item.label}</div>
                <p className="text-sm text-white/60 dark:text-[#051A24]/60 leading-relaxed">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
