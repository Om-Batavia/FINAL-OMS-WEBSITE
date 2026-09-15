import { projects } from './data/projects';

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  projectSlug?: string;
}

export const seoRoutes: SeoRoute[] = [
  {
    path: '/',
    title: 'Om Batavia — AI Systems Builder & Student Entrepreneur',
    description: 'Om Batavia builds practical AI systems for model routing, invoice automation, retail operations, and visual matching. Explore projects, experience, and collaborations.',
    type: 'website'
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}/`,
    title: project.seoTitle,
    description: project.seoDescription,
    type: 'article' as const,
    projectSlug: project.slug
  }))
];

