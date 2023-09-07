import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a style="font-weight:bold;" class='navbar-brand'>{{pageTitle}}</a>
      <ul class='navbar-nav'>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active'
              [routerLink]="['/welcome']">Home</a>
        </li>
        <!-- <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/courses']">Course List</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/courses/0/edit']">Add Course</a>
        </li> -->
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/login']">Login</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/signUp']">Sign Up</a>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'OnlineCourses';
}
 


