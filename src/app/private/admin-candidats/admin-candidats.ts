import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sessions } from '../../commun/interfaces/sessions';
import { Formations } from '../../commun/service/formations';
import { AdminCandidatsService, CandidatAvecSession } from '../services/admin-candidats.service';

@Component({
  selector: 'app-admin-candidats',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-candidats.html',
  styleUrls: ['./admin-candidats.css'],
})
export class AdminCandidats {
  formations: Formations['formationsList'];
  candidats: AdminCandidatsService['candidats'];

  candidatForm: {
    id: number | null;
    formationId: number | null;
    sessionId: number | null;
    nom: string;
    prenom: string;
    email: string;
    cin: number | null;
    telephone: number | null;
    mdp: string;
  } = {
    id: null,
    formationId: null,
    sessionId: null,
    nom: '',
    prenom: '',
    email: '',
    cin: null,
    telephone: null,
    mdp: '',
  };

  constructor(
    private formationsService: Formations,
    private candidatsService: AdminCandidatsService
  ) {
    this.formations = this.formationsService.formationsList;
    this.candidats = this.candidatsService.candidats;
  }

  sessionsForFormation(): Sessions[] {
    const formation = this.formationsService
      .formationsList()
      .find((item) => item.id === this.candidatForm.formationId);
    return formation ? formation.sessions : [];
  }

  saveCandidat() {
    if (!this.candidatForm.formationId || !this.candidatForm.sessionId) {
      return;
    }

    const payload = {
      nom: this.candidatForm.nom,
      prenom: this.candidatForm.prenom,
      email: this.candidatForm.email,
      cin: Number(this.candidatForm.cin) || 0,
      mdp: this.candidatForm.mdp,
      telephone: Number(this.candidatForm.telephone) || undefined,
    };

    if (this.candidatForm.id) {
      this.candidatsService.updateCandidat(this.candidatForm.formationId, this.candidatForm.sessionId, {
        ...payload,
        id: this.candidatForm.id,
      });
    } else {
      this.candidatsService.addCandidat(
        this.candidatForm.formationId,
        this.candidatForm.sessionId,
        payload
      );
    }

    this.resetForm();
  }

  editCandidat(candidat: CandidatAvecSession) {
    this.candidatForm = {
      id: candidat.id,
      formationId: candidat.formationId,
      sessionId: candidat.sessionId,
      nom: candidat.nom,
      prenom: candidat.prenom,
      email: candidat.email,
      cin: candidat.cin,
      telephone: candidat.telephone ?? null,
      mdp: candidat.mdp,
    };
  }

  deleteCandidat(candidat: CandidatAvecSession) {
    this.candidatsService.deleteCandidat(candidat.formationId, candidat.sessionId, candidat.id);
    this.resetForm();
  }

  resetForm() {
    this.candidatForm = {
      id: null,
      formationId: null,
      sessionId: null,
      nom: '',
      prenom: '',
      email: '',
      cin: null,
      telephone: null,
      mdp: '',
    };
  }
}
