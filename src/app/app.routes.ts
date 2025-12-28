import { Routes } from '@angular/router';
import { Accueil } from './public/accueil/accueil';
import { FormationsList } from './public/formations-list/formations-list';
import { FormationAll } from './public/formation-all/formation-all';
import { AdminSpace } from './private/admin-space/admin-space';
import { AdminHome } from './private/admin-home/admin-home';
import { AdminCandidats } from './private/admin-candidats/admin-candidats';
import { AdminFormateurs } from './private/admin-formateurs/admin-formateurs';
import { AdminFormations } from './private/admin-formations/admin-formations';
import { AdminSessions } from './private/admin-sessions/admin-sessions';


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
  {
    path: 'admin-space',
    component: AdminSpace,
    children: [
      { path: '', component: AdminHome },
      { path: 'candidats', component: AdminCandidats },
      { path: 'formateurs', component: AdminFormateurs },
      { path: 'formations', component: AdminFormations },
      { path: 'sessions', component: AdminSessions },
    ]
  },

  { path: '**', redirectTo: 'accueil' }
];
