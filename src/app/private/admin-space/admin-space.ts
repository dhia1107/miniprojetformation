import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-space.html',
  styleUrls: ['./admin-space.css'],
})
export class AdminSpace {}
