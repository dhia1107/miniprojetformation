import { computed, Injectable } from '@angular/core';
import { Formateurs } from '../../commun/interfaces/formateurs';
import { Sessions } from '../../commun/interfaces/sessions';
import { Formations } from '../../commun/service/formations';

export interface SessionAvecFormation extends Sessions {
  formationId: number;
  formationTitre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminSessionsService {
  constructor(private formationsService: Formations) {}

  sessions = computed<SessionAvecFormation[]>(() =>
    this.formationsService.formationsList().flatMap((formation) =>
      formation.sessions.map((session) => ({
        ...session,
        formationId: formation.id,
        formationTitre: formation.titre,
      }))
    )
  );

  private nextId(): number {
    const ids = this.sessions().map((session) => session.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private toDate(value: string): Date {
    return value ? new Date(value) : new Date();
  }

  private pickFormateurs(ids: number[]): Formateurs[] {
    return this.formationsService
      .formateurs()
      .filter((formateur) => ids.includes(formateur.id));
  }

  addSession(
    formationId: number,
    data: { description: string; dateDebut: string; dateFin: string; formateurIds: number[]; complet?: boolean }
  ) {
    const nouvelleSession: Sessions = {
      id: this.nextId(),
      description: data.description,
      dateDebut: this.toDate(data.dateDebut),
      dateFin: this.toDate(data.dateFin),
      formateurs: this.pickFormateurs(data.formateurIds),
      candidats: [],
      complet: !!data.complet,
    };

    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) =>
        formation.id === formationId
          ? { ...formation, sessions: [...formation.sessions, nouvelleSession] }
          : formation
      )
    );
  }

  updateSession(
    formationId: number,
    data: { id: number; description: string; dateDebut: string; dateFin: string; formateurIds: number[]; complet: boolean }
  ) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => {
        if (formation.id !== formationId) {
          return formation;
        }

        const sessions = formation.sessions.map((session) => {
          if (session.id !== data.id) {
            return session;
          }

          const candidats = [...session.candidats];
          const complet = candidats.length >= 15 ? true : data.complet;

          return {
            ...session,
            description: data.description,
            dateDebut: this.toDate(data.dateDebut),
            dateFin: this.toDate(data.dateFin),
            formateurs: this.pickFormateurs(data.formateurIds),
            candidats,
            complet,
          };
        });

        return { ...formation, sessions };
      })
    );
  }

  deleteSession(formationId: number, sessionId: number) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) =>
        formation.id === formationId
          ? {
              ...formation,
              sessions: formation.sessions.filter(
                (session) => session.id !== sessionId
              ),
            }
          : formation
      )
    );
  }
}
