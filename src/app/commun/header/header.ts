import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule,RouterLink],
})
export class Header {
  menuopened = signal(false);
  menulist =[
    {label: 'accueil', path: '/accueil'},
    {label: 'formation', path: '/formation'},
  ]
  toggleMenu() {
    this.menuopened.update(open => !open);
  }
  closemenu() {
    this.menuopened.set (false);
  }

}
