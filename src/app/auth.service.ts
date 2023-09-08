import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authState = { isAuthenticated: false };

  // Simulate user login
  login() {
    this.authState.isAuthenticated = true;
  }

  // Simulate user logout
  logout() {
    this.authState.isAuthenticated = false;
   
  }

  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.authState.isAuthenticated;
  }
}
