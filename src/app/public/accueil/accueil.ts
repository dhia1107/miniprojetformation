import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Formations } from '../../commun/service/formations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxNumberTickerComponent],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class Accueil {
  private formationService = inject(Formations);
  formationavance = this.formationService.formationsavance;
  formationdebutant = this.formationService.formationsdebutant;
  formations = this.formationService.getformations();

  // Browser detection for SSR-safe rendering
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
}