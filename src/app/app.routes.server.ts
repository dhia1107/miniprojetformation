import { RenderMode, ServerRoute } from '@angular/ssr';

const formationIds = ['1', '2', '3', '4', '5', '6'];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'formation/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => formationIds.map((id) => ({ id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
