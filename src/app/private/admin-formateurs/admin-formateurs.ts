import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminFormateursService } from '../services/admin-formateurs.service';
import { Formateurs } from '../../commun/interfaces/formateurs';

@Component({
  selector: 'app-admin-formateurs',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-formateurs.html',
  styleUrls: ['./admin-formateurs.css'],
})
export class AdminFormateurs {
  formateurs: AdminFormateursService['formateurs'];

  formateurForm: { id: number | null; nom: string; prenom: string; email: string; telephone: number | null; cin: number | null; specialites: string } = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    telephone: null,
    cin: null,
    specialites: '',
  };

  constructor(private formateurService: AdminFormateursService) {
    this.formateurs = this.formateurService.formateurs;
  }

  saveFormateur() {
    if (!this.formateurForm.nom || !this.formateurForm.prenom || !this.formateurForm.email) {
      return;
    }

    const specialites = this.formateurForm.specialites
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload: Omit<Formateurs, 'id'> = {
      nom: this.formateurForm.nom,
      prenom: this.formateurForm.prenom,
      email: this.formateurForm.email,
      telephone: Number(this.formateurForm.telephone) || 0,
      cin: Number(this.formateurForm.cin) || 0,
      specialites,
    };

    if (this.formateurForm.id) {
      this.formateurService.updateFormateur({ ...payload, id: this.formateurForm.id });
    } else {
      this.formateurService.addFormateur(payload);
    }

    this.resetForm();
  }

  editFormateur(formateur: Formateurs) {
    this.formateurForm = {
      ...formateur,
      specialites: formateur.specialites.join(', '),
    };
  }

  deleteFormateur(id: number) {
    this.formateurService.deleteFormateur(id);
    this.resetForm();
  }

  resetForm() {
    this.formateurForm = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      telephone: null,
      cin: null,
      specialites: '',
    };
  }
}
