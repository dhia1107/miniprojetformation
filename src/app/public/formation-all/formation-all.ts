import { Component } from '@angular/core';
import { Header } from '../../commun/header/header';
import { Footer } from '../../commun/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-formation-all',
  imports: [Header,Footer,RouterOutlet],
  templateUrl: './formation-all.html',
  styleUrls: ['./formation-all.css'],
})
export class FormationAll {

}
