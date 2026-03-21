import { Injectable, signal } from "@angular/core";
import { SupabaseService } from "./supabase.service";

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly storageKey = "cms-auth-state";
  readonly isLoggedIn = signal<boolean>(this.readState());

  constructor(private supabaseService: SupabaseService) {}

  async login(
    payload: LoginPayload,
  ): Promise<{
    success: boolean;
    message?: string;
    user?: any;
    profile?: any;
  }> {
    console.log("AuthService login payload:", payload);
    const { data, error } =
      await this.supabaseService.supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

    console.log("Supabase auth response:", data);
    console.log("Supabase auth error:", error);

    if (error) {
      this.isLoggedIn.set(false);
      localStorage.removeItem(this.storageKey);

      return {
        success: false,
        message: error.message,
      };
    }

    const userId = data.user.id;
    console.log("Logged in user ID:", userId);

    const { data: profile, error: profileError } =
      await this.supabaseService.supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    console.log("Profile data:", profile);
    console.log("Profile error:", profileError);

    if (profileError) {
      return {
        success: false,
        message: profileError.message,
      };
    }

    localStorage.setItem(this.storageKey, "true");
    this.isLoggedIn.set(true);

    return {
      success: true,
      user: data.user,
      profile,
    };
  }

  async logout(): Promise<void> {
    await this.supabaseService.supabase.auth.signOut();
    localStorage.removeItem(this.storageKey);
    this.isLoggedIn.set(false);
  }

  private readState(): boolean {
    return localStorage.getItem(this.storageKey) === "true";
  }
}
