import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { currentUser } from './bussiness/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SistemaWeb';
  currentUser = currentUser; 
  menuOpen: boolean = false; 

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }

  isRootRoute(): boolean {
    return this.router.url === '/'; 
  }

  logout() {
    currentUser.set(null); // Limpia los datos del usuario
    this.router.navigate(['/']); // Redirige al login
  }
}
