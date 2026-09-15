export type ProjectKind = 'invoices' | 'altself' | 'lost-found';

export interface Project {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  problem: string;
  solution: string;
  impact: string;
  role: string;
  kind: ProjectKind;
}

export const projects: Project[] = [
  {
    title: 'Smart Invoices (Smart Kirana)',
    slug: 'smart-invoices',
    seoTitle: 'Smart Invoices — AI Billing & Inventory for Kirana Stores',
    seoDescription: 'Smart Invoices is Om Batavia’s AI workflow for extracting supplier invoice data, tracking inventory, and flagging restock needs for Indian retailers.',
    kicker: 'AI for local retail operations',
    problem: 'Kirana stores lose time and accuracy when invoice, stock, and expense data stay trapped in paper or WhatsApp images.',
    solution: 'Built an inventory system with FastAPI, React, and PostgreSQL, including invoice extraction, product matching, low-stock reports, and purchase summaries.',
    impact: 'Deployed the frontend on Vercel and the backend on Render. Built for Indian retailers and wholesalers.',
    role: 'Founder — product, AI workflow, business systems',
    kind: 'invoices'
  },
  {
    title: 'ALTSELF',
    slug: 'altself',
    seoTitle: 'ALTSELF — Cost-Aware AI Model Routing Infrastructure',
    seoDescription: 'ALTSELF routes AI tasks by complexity, quality, latency, and cost so products avoid using expensive models when simpler models can do the job.',
    kicker: 'Model routing infrastructure',
    problem: 'Expensive AI models are often used for simple tasks, making products slower and more costly than they need to be.',
    solution: 'A routing layer that chooses a model based on task complexity, expected quality, latency, and cost.',
    impact: 'Designed to help teams keep output quality high while avoiding unnecessary AI spend.',
    role: 'Founder — orchestration logic, product direction',
    kind: 'altself'
  },
  {
    title: 'AI Lost & Found',
    slug: 'ai-lost-and-found',
    seoTitle: 'AI Lost & Found — Visual Item Matching for Campuses',
    seoDescription: 'AI Lost & Found is Om Batavia’s school-focused platform with QR-based workflows, school-scoped item matching, ownership checks, and administrative review.',
    kicker: 'Visual matching for campuses and venues',
    problem: 'Lost item desks rely on manual matching, vague descriptions, and repeated back-and-forth with owners.',
    solution: 'Built a school-focused platform with authentication, QR-based workflows, school-scoped item matching, and administrative review.',
    impact: 'Implemented ownership checks and rate limiting using React, FastAPI, SQLite, and JWT authentication.',
    role: 'Builder — application development and matching workflow',
    kind: 'lost-found'
  }
];
