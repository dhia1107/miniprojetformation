import { Routes } from '@angular/router';
import { Accueil } from './public/accueil/accueil';
import { FormationsList } from './public/formations-list/formations-list';
import { FormationAll } from './public/formation-all/formation-all';


export const routes: Routes = [
  { 
    path: '', 
    component: FormationAll, 
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: Accueil },
      { path: 'formations', component: FormationsList },
      { 
        path: 'formation/:id', 
        loadComponent: () => import('./public/formation-details/formation-details').then(m => m.FormationDetails) 
      },
    ]
  },


  { path: '**', redirectTo: 'accueil' }
];
