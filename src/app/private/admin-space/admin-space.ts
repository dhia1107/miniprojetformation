import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-space.html',
  styleUrls: ['./admin-space.css'],
})
export class AdminSpace {}
