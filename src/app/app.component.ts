import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly showShell = computed(() => this.authService.isLoggedIn() && !this.router.url.startsWith('/login'));

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe();
  }
}
