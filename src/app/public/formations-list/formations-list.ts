import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Formations } from '../../commun/service/formations';
import { Formation } from '../../commun/interfaces/formation';

@Component({
  selector: 'app-formations-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './formations-list.html',
  styleUrls: ['./formations-list.css'],
})
export class FormationsList {
  private formationService = inject(Formations);
  formations = this.formationService.getformations();
  categories = this.formationService.allcategories;
  
  // 🎯 FILTRES
  selectedCategory = signal<string>('');
  search = signal<string>('');
  filteredFormations = signal<Formation[]>(this.formations);

  // 🎯 MÉTHODES DE FILTRAGE

   onCategorySelect(category: string) {
    this.selectedCategory.set(category);
    this.applyFilters();
  }

  onSearch(term: string) {
    this.search.set(term);
    this.applyFilters();
  }

  private applyFilters() {
    let results = this.formations;

    // Filtre par recherche
    if (this.search()) {
      results = this.formationService.searchFormationByTitle(this.search());
    }

    // Filtre par catégorie
    if (this.selectedCategory()) {
      results = results.filter(formation => 
        formation.categorie.includes(this.selectedCategory())
      );
    }

    this.filteredFormations.set(results);
  }

  // 🎯 MÉTHODE POUR COMPTER LES SESSIONS DISPONIBLES
  getSessionsDisponibles(formation: Formation): number {
    return formation.sessions.filter(session => !session.complet).length;
  }
}