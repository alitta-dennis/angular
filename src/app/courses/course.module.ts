import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { CourseData } from './product-data';

import { CourseListComponent } from './course-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseEditComponent } from './course-edit.component';
import { CourseEditGuard } from './course-edit.guard';
import { AuthGuard } from '../route.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    //InMemoryWebApiModule.forRoot(CourseData),
    RouterModule.forChild([
      { path: 'courses', canActivate:[AuthGuard], component: CourseListComponent },
      { path: 'courses/:id', canActivate:[AuthGuard], component: CourseDetailComponent },
      {
        path: 'courses/:id/edit',
        canDeactivate: [CourseEditGuard],
        component: CourseEditComponent
      }
    ])
  ],
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CourseEditComponent
  ]
})
export class CourseModule { }
