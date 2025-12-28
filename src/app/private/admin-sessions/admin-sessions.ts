import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Formations } from '../../commun/service/formations';
import { AdminSessionsService, SessionAvecFormation } from '../services/admin-sessions.service';

@Component({
  selector: 'app-admin-sessions',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sessions.html',
  styleUrls: ['./admin-sessions.css'],
})
export class AdminSessions {
  formations: Formations['formationsList'];
  formateurs: Formations['formateurs'];
  sessions: AdminSessionsService['sessions'];

  sessionForm: {
    id: number | null;
    formationId: number | null;
    description: string;
    dateDebut: string;
    dateFin: string;
    formateurIds: number[];
    complet: boolean;
  } = {
    id: null,
    formationId: null,
    description: '',
    dateDebut: '',
    dateFin: '',
    formateurIds: [],
    complet: false,
  };

  constructor(
    private formationsService: Formations,
    private sessionsService: AdminSessionsService
  ) {
    this.formations = this.formationsService.formationsList;
    this.formateurs = this.formationsService.formateurs;
    this.sessions = this.sessionsService.sessions;
  }

  saveSession() {
    if (!this.sessionForm.formationId) {
      return;
    }

    if (this.sessionForm.id) {
      this.sessionsService.updateSession(this.sessionForm.formationId, {
        id: this.sessionForm.id,
        description: this.sessionForm.description,
        dateDebut: this.sessionForm.dateDebut,
        dateFin: this.sessionForm.dateFin,
        formateurIds: this.sessionForm.formateurIds,
        complet: this.sessionForm.complet,
      });
    } else {
      this.sessionsService.addSession(this.sessionForm.formationId, {
        description: this.sessionForm.description,
        dateDebut: this.sessionForm.dateDebut,
        dateFin: this.sessionForm.dateFin,
        formateurIds: this.sessionForm.formateurIds,
        complet: this.sessionForm.complet,
      });
    }

    this.resetForm();
  }

  editSession(session: SessionAvecFormation) {
    this.sessionForm = {
      id: session.id,
      formationId: session.formationId,
      description: session.description,
      dateDebut: this.formatDate(session.dateDebut),
      dateFin: this.formatDate(session.dateFin),
      formateurIds: session.formateurs.map((formateur) => formateur.id),
      complet: session.complet,
    };
  }

  deleteSession(session: SessionAvecFormation) {
    this.sessionsService.deleteSession(session.formationId, session.id);
    this.resetForm();
  }

  resetForm() {
    this.sessionForm = {
      id: null,
      formationId: null,
      description: '',
      dateDebut: '',
      dateFin: '',
      formateurIds: [],
      complet: false,
    };
  }

  private formatDate(date: Date): string {
    const value = new Date(date);
    return value.toISOString().split('T')[0];
  }
}
