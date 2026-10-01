import type { Project } from '../data/projects';

const labels = ['Problem', 'Solution', 'Context', 'Role'] as const;

export function ProjectPage({ project }: { project: Project }) {
  const details = {
    Problem: project.problem,
    Solution: project.solution,
    Context: project.impact,
    Role: project.role
  };

  return (
    <div className="min-h-screen bg-[#030404] text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <a href="/" className="font-['PP_Mondwest'] text-2xl font-semibold">Om Batavia</a>
        <a href="/#projects" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10">All projects</a>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-white/55">
          <a href="/" className="hover:text-white">Home</a>
          <span aria-hidden="true"> / </span>
          <a href="/#projects" className="hover:text-white">Projects</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">{project.kicker}</p>
        <h1 className="max-w-4xl font-['PP_Mondwest'] text-5xl leading-none md:text-7xl">{project.title}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/70">{project.seoDescription}</p>
        <p className="mt-5 text-sm text-white/70">Built by <a href="/#about" className="underline underline-offset-4">Om Batavia</a>, a student at The Riverside School, Ahmedabad.</p>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {labels.map((label) => (
            <section key={label} aria-labelledby={`${project.slug}-${label.toLowerCase()}`} className="rounded-[28px] border border-white/10 bg-white/5 p-7 md:p-9">
              <h2 id={`${project.slug}-${label.toLowerCase()}`} className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{label}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">{details[label]}</p>
            </section>
          ))}
        </div>

        <section aria-labelledby="project-contact" className="mt-16 rounded-[32px] bg-white p-8 text-[#051A24] md:p-12">
          <h2 id="project-contact" className="font-['PP_Mondwest'] text-4xl md:text-5xl">Build something useful.</h2>
          <p className="mt-4 max-w-2xl text-[#051A24]/70">Have a related AI workflow, product idea, or operational problem? Share the context and desired outcome.</p>
          <a href={`mailto:ombatavia23@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${project.title}`)}`} className="mt-8 inline-flex rounded-full bg-[#051A24] px-6 py-3 font-medium text-white">Contact Om</a>
        </section>
      </main>
    </div>
  );
}
