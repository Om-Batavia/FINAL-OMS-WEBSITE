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
    title: 'Om Batavia | The Riverside School Student & AI Builder',
    description: 'Om Batavia is a student at The Riverside School, Ahmedabad, and founder of ALTSELF and Smart Invoices. Explore his AI projects, student leadership, and experience.',
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

