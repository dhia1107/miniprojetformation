import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../commun/interfaces/formation';
import { AdminFormationsService } from '../services/admin-formations.service';

@Component({
  selector: 'app-admin-formations',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-formations.html',
  styleUrls: ['./admin-formations.css'],
})
export class AdminFormations {
  formations: AdminFormationsService['formations'];
  niveaux: Formation['niveau'][] = ['debutant', 'intermediaire', 'avance'];

  formationForm: {
    id: number | null;
    titre: string;
    description: string;
    duree: number | null;
    image: string;
    niveau: Formation['niveau'];
    tags: string;
    categorie: string;
  } = {
    id: null,
    titre: '',
    description: '',
    duree: null,
    image: '',
    niveau: 'debutant',
    tags: '',
    categorie: '',
  };

  constructor(private formationsService: AdminFormationsService) {
    this.formations = this.formationsService.formations;
  }

  saveFormation() {
    if (!this.formationForm.titre || !this.formationForm.description) {
      return;
    }

    const tags = this.formationForm.tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const categorie = this.formationForm.categorie
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload: Formation = {
      id: this.formationForm.id ?? 0,
      titre: this.formationForm.titre,
      description: this.formationForm.description,
      image: this.formationForm.image,
      duree: Number(this.formationForm.duree) || 0,
      niveau: this.formationForm.niveau,
      tags,
      categorie,
      sessions: [],
    };

    if (this.formationForm.id) {
      const current = this.formations().find((item) => item.id === this.formationForm.id);
      payload.sessions = current ? current.sessions : [];
      this.formationsService.updateFormation(payload);
    } else {
      this.formationsService.addFormation(payload);
    }

    this.resetForm();
  }

  editFormation(formation: Formation) {
    this.formationForm = {
      id: formation.id,
      titre: formation.titre,
      description: formation.description,
      duree: formation.duree,
      image: formation.image || '',
      niveau: formation.niveau,
      tags: formation.tags.join(', '),
      categorie: formation.categorie.join(', '),
    };
  }

  deleteFormation(id: number) {
    this.formationsService.deleteFormation(id);
    this.resetForm();
  }

  resetForm() {
    this.formationForm = {
      id: null,
      titre: '',
      description: '',
      duree: null,
      image: '',
      niveau: 'debutant',
      tags: '',
      categorie: '',
    };
  }
}
