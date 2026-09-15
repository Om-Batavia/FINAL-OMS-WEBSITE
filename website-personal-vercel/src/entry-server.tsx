import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Route } from './routes';
import { seoRoutes } from './seo';

export { seoRoutes };

export function render(pathname: string) {
  return renderToString(
    <StrictMode>
      <Route pathname={pathname} />
    </StrictMode>
  );
}
