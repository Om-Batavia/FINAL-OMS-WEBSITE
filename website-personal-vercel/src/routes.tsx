import App from './App';
import { ProjectPage } from './components/ProjectPage';
import { projects } from './data/projects';

export function Route({ pathname }: { pathname: string }) {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const project = projects.find((item) => normalizedPath === `/projects/${item.slug}/`);
  return project ? <ProjectPage project={project} /> : <App />;
}
