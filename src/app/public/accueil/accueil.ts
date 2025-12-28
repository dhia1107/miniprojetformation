import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Formations } from '../../commun/service/formations';
import { CommonModule } from '@angular/common';
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxNumberTickerComponent],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class Accueil implements OnInit {
  private formationService = inject(Formations);
  formationavance = this.formationService.formationsavance;
  formationdebutant = this.formationService.formationsdebutant;
  formations = this.formationService.getformations();
  showTickers = signal(false);

  ngOnInit() {
    const hasRaf =
      typeof globalThis !== 'undefined' &&
      typeof (globalThis as { requestAnimationFrame?: unknown }).requestAnimationFrame === 'function';
    this.showTickers.set(!!hasRaf);
  }
}
