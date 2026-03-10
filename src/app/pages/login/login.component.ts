import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly authError = signal<string | null>(null);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    this.authError.set(null);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const success = this.authService.login(this.loginForm.getRawValue());

    setTimeout(() => {
      this.isSubmitting.set(false);
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.authError.set('Login failed. Please use valid credentials.');
      }
    }, 400);
  }
}
