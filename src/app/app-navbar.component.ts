import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Import AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a style="font-weight:bold;" class='navbar-brand'>{{pageTitle}}</a>
      <ul class='navbar-nav'>
      <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLink]="['/welcome']">Home</a></li>
    <li class='nav-item' *ngIf="!authService.isAuthenticatedUser()"><a class='nav-link' routerLinkActive='active' [routerLink]="['/login']">Login</a></li>
    <li class='nav-item' *ngIf="!authService.isAuthenticatedUser()"><a class='nav-link' routerLinkActive='active' [routerLink]="['/signUp']">Sign Up</a></li>
    <li class='nav-item' *ngIf="authService.isAuthenticatedUser()"><a class='nav-link' routerLinkActive='active' [routerLink]="['/courses']">Courses</a></li>
    <li class='nav-item' *ngIf="authService.isAuthenticatedUser()"><a class='nav-link' routerLinkActive='active' [routerLink]="['/courses/0/edit']">Add Course</a></li>
    <li class='nav-item' *ngIf="authService.isAuthenticatedUser()"><a class='nav-link' (click)="logout()">Logout</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  pageTitle = 'Remote Desk';
  isAuthenticated = false;
  // app-navbar.component.ts
  constructor(public authService: AuthService,private router:Router) {}
  ngOnInit() {
    console.log('AppNavbarComponent initialized');
    // Check if the user is authenticated when the component loads
    this.isAuthenticated = this.authService.authState.isAuthenticated;
    console.log(this.isAuthenticated);
  } 
  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    // Update the isAuthenticated status to false
    this.isAuthenticated = false;
    this.router.navigate( ['/login'])
  } 
}
