import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email = "";
  password = "";
  errorMessage = "";
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onLogin(): Promise<void> {
    console.log("Login button clicked");
    console.log("Email:", this.email);
    console.log("Password:", this.password);
    this.loading = true;
    this.errorMessage = "";

    try {
      const result = await this.authService.login({
        email: this.email,
        password: this.password,
      });

      console.log("Login result:", result);

      this.loading = false;

      if (!result.success) {
        this.errorMessage = result.message || "Login failed";
        console.log("Login failed:", this.errorMessage);
        return;
      }

      console.log("Login success, navigating to dashboard");
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      console.error("Unexpected login error:", error);
      this.errorMessage = "Something went wrong.";
    } finally {
      this.loading = false;
    }
  }
}
