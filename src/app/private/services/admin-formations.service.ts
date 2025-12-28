import { Injectable } from '@angular/core';
import { Formation } from '../../commun/interfaces/formation';
import { Formations } from '../../commun/service/formations';

@Injectable({
  providedIn: 'root',
})
export class AdminFormationsService {
  formations: Formations['formationsList'];

  constructor(private formationsService: Formations) {
    this.formations = this.formationsService.formationsList;
  }

  private nextId(): number {
    const ids = this.formationsService
      .formationsList()
      .map((formation) => formation.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  addFormation(formation: Omit<Formation, 'id'>) {
    const newFormation: Formation = {
      ...formation,
      id: this.nextId(),
      sessions: formation.sessions ?? [],
    };

    this.formationsService.formationsList.update((list) => [
      ...list,
      newFormation,
    ]);
  }

  updateFormation(updated: Formation) {
    this.formationsService.formationsList.update((list) =>
      list.map((formation) =>
        formation.id === updated.id ? { ...formation, ...updated } : formation
      )
    );
  }

  deleteFormation(id: number) {
    this.formationsService.formationsList.update((list) =>
      list.filter((formation) => formation.id !== id)
    );
  }
}
