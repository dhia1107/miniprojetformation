import { Injectable } from '@angular/core';
import { Formateurs } from '../../commun/interfaces/formateurs';
import { Formations } from '../../commun/service/formations';

@Injectable({
  providedIn: 'root',
})
export class AdminFormateursService {
  formateurs: Formations['formateurs'];

  constructor(private formationsService: Formations) {
    this.formateurs = this.formationsService.formateurs;
  }

  private nextId(): number {
    const ids = this.formateurs().map((formateur) => formateur.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  addFormateur(formateur: Omit<Formateurs, 'id'>) {
    const nouveauFormateur: Formateurs = {
      ...formateur,
      id: this.nextId(),
    };

    this.formateurs.update((liste) => [...liste, nouveauFormateur]);
  }

  updateFormateur(updated: Formateurs) {
    this.formateurs.update((liste) =>
      liste.map((formateur) =>
        formateur.id === updated.id ? { ...formateur, ...updated } : formateur
      )
    );
    this.propagateUpdate(updated);
  }

  deleteFormateur(id: number) {
    this.formateurs.update((liste) => liste.filter((formateur) => formateur.id !== id));
    this.removeFromSessions(id);
  }

  private propagateUpdate(updated: Formateurs) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => ({
        ...formation,
        sessions: formation.sessions.map((session) => ({
          ...session,
          formateurs: session.formateurs.map((formateur) =>
            formateur.id === updated.id ? { ...formateur, ...updated } : formateur
          ),
        })),
      }))
    );
  }

  private removeFromSessions(id: number) {
    this.formationsService.formationsList.update((formations) =>
      formations.map((formation) => ({
        ...formation,
        sessions: formation.sessions.map((session) => ({
          ...session,
          formateurs: session.formateurs.filter((formateur) => formateur.id !== id),
        })),
      }))
    );
  }
}
