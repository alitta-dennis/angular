import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseEditComponent } from './course-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CourseEditGuard implements CanDeactivate<CourseEditComponent> {
  canDeactivate(component: CourseEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.courseForm.dirty) {
      const courseName = component.courseForm.get('courseName')?.value || 'New Course';
      return confirm(`Navigate away and lose all changes to ${courseName}?`);
    }
    return true;
  }
}
