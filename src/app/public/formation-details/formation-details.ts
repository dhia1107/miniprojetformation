import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Formations } from '../../commun/service/formations';
import { CommonModule } from '@angular/common';
import { Formation } from '../../commun/interfaces/formation';
import { Sessions } from '../../commun/interfaces/sessions';
import { Candidats } from '../../commun/interfaces/candidats';

@Component({
  selector: 'app-formation-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './formation-details.html',
  styleUrls: ['./formation-details.css'],
})
export class FormationDetails implements OnInit {
  // Max places per session centralized for easy change
  MAX_PLACES = 15;

  formation!: Formation;
  showInscriptionModal = false;
  selectedSession: Sessions | null = null;
  candidatNom = '';
  candidatPrenom = '';
  candidatEmail = '';

  constructor(
    private route: ActivatedRoute,
    private formationService: Formations
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const formationTrouvee = this.formationService.getFormationById(+id!);
      
    if (formationTrouvee !== undefined) {
      this.formation = formationTrouvee;
    } else {
      console.error('Formation non trouvée');
    }
  }

  openInscription(session: Sessions) {
    this.selectedSession = session;
    this.showInscriptionModal = true;
  }

  inscrire() {
    if (!this.selectedSession || !this.formation) return;

    // Check capacity one more time (race condition safety)
    if (this.selectedSession.candidats.length >= this.MAX_PLACES) {
      alert('Désolé, cette session est complète !');
      return;
    }

    if (!this.candidatNom || !this.candidatPrenom || !this.candidatEmail) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Create a properly typed candidat
    const existingIds = this.selectedSession.candidats.map(c => c.id);
    const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;
    const newCandidat: Candidats = {
      id: nextId,
      nom: this.candidatNom,
      prenom: this.candidatPrenom,
      email: this.candidatEmail,
      cin: Date.now() % 100000000, // simple unique-ish CIN
      mdp: '' // not used in this flow
    };

    // Add candidat (immutably for safer change-detection)
    this.selectedSession.candidats = [...this.selectedSession.candidats, newCandidat];

    // Update completion status
    if (this.selectedSession.candidats.length >= this.MAX_PLACES) {
      this.selectedSession.complet = true;
      alert(`✅ Inscription réussie ! La session est désormais complète (${this.selectedSession.candidats.length}/${this.MAX_PLACES}).`);
    } else {
      alert(`✅ Inscription réussie !\n${this.candidatPrenom} ${this.candidatNom} est inscrit(e) à la session.`);
    }

    // Reflect the updated session in the local formation object to ensure UI updates
    const idx = this.formation.sessions.findIndex(s => s.id === this.selectedSession!.id);
    if (idx !== -1) {
      this.formation.sessions[idx] = { ...this.selectedSession, candidats: [...this.selectedSession.candidats] };
      // Force shallow copy to trigger bindings if needed
      this.formation = { ...this.formation, sessions: [...this.formation.sessions] };
    }

    this.closeInscription();
  }

  isSessionComplete(session: Sessions | null): boolean {
    return !!session && session.candidats.length >= this.MAX_PLACES;
  }

  telechargerProgramme() {
    alert('Téléchargement du programme PDF...');
  }

  closeInscription() {
    this.showInscriptionModal = false;
    this.selectedSession = null;
    this.candidatNom = '';
    this.candidatPrenom = '';
    this.candidatEmail = '';
  }
}
