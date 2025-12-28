import { computed, Injectable } from '@angular/core';
import { Candidats } from '../../commun/interfaces/candidats';
import { Formations } from '../../commun/service/formations';

export interface CandidatAvecSession extends Candidats {
  formationId: number;
  sessionId: number;
  formationTitre: string;
  sessionDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminCandidatsService {
  constructor(private formationsService: Formations) {}

  candidats = computed<CandidatAvecSession[]>(() =>
    this.formationsService.formationsList().flatMap((formation) =>
      formation.sessions.flatMap((session) =>
        session.candidats.map((candidat) => ({
          ...candidat,
          formationId: formation.id,
          sessionId: session.id,
          formationTitre: formation.titre,
          sessionDescription: session.description,
        }))
      )
    )
  );

  private nextId(formationId: number, sessionId: number): number {
    const formation = this.formationsService
      .formationsList()
      .find((item) => item.id === formationId);

    const session = formation?.sessions.find((item) => item.id === sessionId);
    const ids = session ? session.candidats.map((candidat) => candidat.id) : [];

    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  addCandidat(formationId: number, sessionId: number, data: Omit<Candidats, 'id'>) {
    const candidat: Candidats = {
      ...data,
      id: this.nextId(formationId, sessionId),
    };

    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => {
        if (formation.id !== formationId) {
          return formation;
        }

        const sessions = formation.sessions.map((session) => {
          if (session.id !== sessionId) {
            return session;
          }

          const candidats = [...session.candidats, candidat];
          return {
            ...session,
            candidats,
            complet: candidats.length >= 15,
          };
        });

        return { ...formation, sessions };
      })
    );
  }

  updateCandidat(formationId: number, sessionId: number, data: Candidats) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => {
        if (formation.id !== formationId) {
          return formation;
        }

        const sessions = formation.sessions.map((session) => {
          if (session.id !== sessionId) {
            return session;
          }

          const candidats = session.candidats.map((candidat) =>
            candidat.id === data.id ? { ...candidat, ...data } : candidat
          );

          return {
            ...session,
            candidats,
            complet: candidats.length >= 15,
          };
        });

        return { ...formation, sessions };
      })
    );
  }

  deleteCandidat(formationId: number, sessionId: number, candidatId: number) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => {
        if (formation.id !== formationId) {
          return formation;
        }

        const sessions = formation.sessions.map((session) => {
          if (session.id !== sessionId) {
            return session;
          }

          const candidats = session.candidats.filter(
            (candidat) => candidat.id !== candidatId
          );

          return {
            ...session,
            candidats,
            complet: candidats.length >= 15,
          };
        });

        return { ...formation, sessions };
      })
    );
  }
}
