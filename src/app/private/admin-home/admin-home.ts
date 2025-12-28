import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.css'],
})
export class AdminHome {
  isBrowser = typeof window !== 'undefined';
  globeComponent: Type<unknown> | null = null;
  blocs = [
    {
      titre: 'Gestion des candidats',
      description: 'Ajouter, modifier ou retirer un candidat dans une session existante.',
    },
    {
      titre: 'Gestion des formateurs',
      description: 'Mettre à jour les informations des formateurs et leurs spécialités.',
    },
    {
      titre: 'Gestion des formations',
      description: 'Créer une nouvelle formation ou mettre à jour celles déjà visibles publiquement.',
    },
    {
      titre: 'Gestion des sessions',
      description: 'Programmer des sessions et assigner des formateurs sur chaque formation.',
    },
  ];

  constructor() {
    if (this.isBrowser) {
      import('@omnedia/ngx-three-globe').then((m) => {
        this.globeComponent = (m as { NgxThreeGlobeComponent?: Type<unknown> }).NgxThreeGlobeComponent ?? null;
      });
    }
  }
}
