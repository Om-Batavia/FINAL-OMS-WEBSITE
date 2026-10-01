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
    seoTitle: 'Smart Invoices — AI Invoice Processing & Inventory | Om Batavia',
    seoDescription: 'Smart Invoices by Om Batavia brings AI invoice processing, product matching, inventory management, and low-stock reports to Indian kirana stores and wholesalers.',
    kicker: 'AI invoice processing for Indian retailers',
    problem: 'Kirana stores and wholesalers lose time and accuracy when supplier invoices, stock records, and expense data stay trapped in paper or WhatsApp images. Manual data entry makes it harder to connect purchases with inventory and identify products that need restocking.',
    solution: 'Built a retail inventory management system with Python, FastAPI, React, and PostgreSQL. The invoice processing workflow extracts supplier data, matches products, and brings inventory records, low-stock reports, and purchase summaries into one application.',
    impact: 'Smart Invoices, also called Smart Kirana, is built for Indian retailers and wholesalers. The React frontend is deployed on Vercel and the FastAPI backend on Render. Its focus is practical business automation: turning supplier invoice information into usable stock and purchasing records.',
    role: 'Founder — product development, AI workflows, and business systems. Om Batavia connects the retailer’s invoice and inventory needs with the application’s frontend, backend, and database design.',
    kind: 'invoices'
  },
  {
    title: 'ALTSELF',
    slug: 'altself',
    seoTitle: 'ALTSELF — AI Model Routing & Cost Optimization | Om Batavia',
    seoDescription: 'ALTSELF is Om Batavia’s AI model routing project, selecting models by task complexity, quality, latency, and cost to reduce unnecessary AI spend.',
    kicker: 'AI infrastructure and model selection',
    problem: 'Using an expensive AI model for every request can add unnecessary cost and latency. Simple tasks and complex tasks have different requirements, so a single model choice may not be the right fit for every part of an AI product.',
    solution: 'ALTSELF is a routing layer that chooses an AI model based on task complexity, expected output quality, latency, and cost. Its model selection and orchestration logic are designed to match the task with an appropriate model while keeping those trade-offs explicit.',
    impact: 'The project explores AI cost optimization and practical infrastructure for AI applications. It is designed for teams deciding how to balance response quality, speed, and operating cost across different tasks, with the aim of avoiding unnecessary model spend.',
    role: 'Founder — AI orchestration logic and product direction. Om Batavia is building ALTSELF around the decisions involved in model routing: what a task needs, how quickly it needs a response, and what that response should cost.',
    kind: 'altself'
  },
  {
    title: 'AI Lost & Found',
    slug: 'ai-lost-and-found',
    seoTitle: 'AI Lost & Found — School Item Matching | Om Batavia',
    seoDescription: 'Explore Om Batavia’s school lost-and-found software: AI item matching, QR-based workflows, ownership checks, and administrative review for school communities.',
    kicker: 'School lost-and-found software',
    problem: 'School lost-and-found desks rely on manual item matching, vague descriptions, and repeated conversations with owners. A digital workflow needs to connect lost and found records within the right school while giving administrators a way to review possible matches.',
    solution: 'Built a school-focused platform with authentication, QR-based workflows, and school-scoped item matching. The lost-and-found workflow combines matching with ownership checks and administrative review, supporting the steps between identifying a possible item and reviewing a claim.',
    impact: 'The application uses React, Python, FastAPI, SQLite, and JWT authentication. Ownership checks and rate limiting are part of the implementation. This project brings together AI-assisted item matching, backend development, and a web interface for a practical school-community problem.',
    role: 'Builder — full-stack application development and the item-matching workflow. Om Batavia worked on the software connecting school records, user authentication, and administrative review.',
    kind: 'lost-found'
  }
];
