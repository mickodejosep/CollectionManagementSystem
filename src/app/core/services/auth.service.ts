import { Injectable, signal } from '@angular/core';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'cms-auth-state';
  readonly isLoggedIn = signal<boolean>(this.readState());

  login(payload: LoginPayload): boolean {
    const isValid = payload.email.trim().length > 0 && payload.password.trim().length >= 6;
    if (isValid) {
      localStorage.setItem(this.storageKey, 'true');
      this.isLoggedIn.set(true);
    }
    return isValid;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.isLoggedIn.set(false);
  }

  private readState(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
