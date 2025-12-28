import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '../../commun/interfaces/formation';
import { Sessions } from '../../commun/interfaces/sessions';
import { AdminCandidatsService } from '../../private/services/admin-candidats.service';
import { Formations } from '../../commun/service/formations';

@Component({
  selector: 'app-formation-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './formation-details.html',
  styleUrls: ['./formation-details.css'],
})
export class FormationDetails implements OnInit {
  MAX_PLACES = 15;
  formation!: Formation;
  showInscriptionModal = false;
  selectedSession: Sessions | null = null;
  candidatForm = {
    formationId: 0,
    sessionId: 0,
    nom: '',
    prenom: '',
    email: '',
    cin: null as number | null,
    telephone: null as number | null,
    mdp: '',
  };

  constructor(
    private route: ActivatedRoute,
    private formationService: Formations,
    private adminCandidatsService: AdminCandidatsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const formationTrouvee = this.formationService.getFormationById(+id!);

    if (formationTrouvee !== undefined) {
      this.formation = formationTrouvee;
    } else {
      console.error('Formation non trouvee');
    }
  }



  openInscription(session: Sessions) {
    this.selectedSession = session;
    this.showInscriptionModal = true;
    this.candidatForm = {
      formationId: this.formation.id,
      sessionId: session.id,
      nom: '',
      prenom: '',
      email: '',
      cin: null,
      telephone: null,
      mdp: '',
    };
  }

  inscrire() {
    if (!this.selectedSession || !this.formation) {
      return;
    }

    if (this.selectedSession.candidats.length >= this.MAX_PLACES) {
      alert('Desole, cette session est complete !');
      return;
    }

    if (!this.candidatForm.nom || !this.candidatForm.prenom || !this.candidatForm.email) {
      alert('Veuillez remplir nom, prenom et email.');
      return;
    }

    this.adminCandidatsService.addCandidat(this.formation.id, this.selectedSession.id, {
      nom: this.candidatForm.nom,
      prenom: this.candidatForm.prenom,
      email: this.candidatForm.email,
      cin: Number(this.candidatForm.cin) || 0,
      telephone: this.candidatForm.telephone ?? undefined,
      mdp: this.candidatForm.mdp,
    });

    const refreshed = this.formationService.getFormationById(this.formation.id);
    if (refreshed) {
      this.formation = refreshed;
      this.selectedSession = refreshed.sessions.find((s) => s.id === this.selectedSession!.id) ?? null;
    }

    const inscrits = this.selectedSession?.candidats.length ?? 0;
    const complet = this.selectedSession?.complet ?? false;
    alert(
      complet
        ? `Inscription reussie ! La session est maintenant complete (${inscrits}/${this.MAX_PLACES}).`
        : `Inscription reussie ! ${this.candidatForm.prenom} ${this.candidatForm.nom} est inscrit(e).`
    );

    this.closeInscription();
  }

  isSessionComplete(session: Sessions | null): boolean {
    return !!session && (session.complet || session.candidats.length >= this.MAX_PLACES);
  }

  closeInscription() {
    this.showInscriptionModal = false;
    this.selectedSession = null;
    this.candidatForm = {
      formationId: 0,
      sessionId: 0,
      nom: '',
      prenom: '',
      email: '',
      cin: null,
      telephone: null,
      mdp: '',
    };
  }
}
