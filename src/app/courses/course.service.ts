
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesUrl = 'http://localhost:3000/coursesList'; // JSON Server endpoint

  constructor(private http: HttpClient) { }

  getCourses(): Observable<course[]> {
    return this.http.get<course[]>(this.coursesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCourse(id: number): Observable<course> {
    if (id === 0) {
      return of(this.initializeCourse());
    }
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<course>(url)
      .pipe(
        tap(data => console.log('getCourse: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCourses(Course: course): Observable<course> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    Course.id = null;
    return this.http.post<course>(this.coursesUrl, Course, { headers })
      .pipe(
        tap(data => console.log('createCourse: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete<course>(url, { headers })
      .pipe(
        tap(data => console.log('deleteCourse: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCourse(Course: course): Observable<course> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.coursesUrl}/${Course.id}`;
    return this.http.put<course>(url, Course, { headers })
      .pipe(
        tap(() => console.log('updateCourse: ' + Course.id)),
        // Return the Course on an update
        map(() => Course),
        catchError(this.handleError)
      );
  }

  // ... Other methods (getCourse, createCourse, deleteCourse, updateCourse) remain the same

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

   private initializeCourse(): course {
    // Return an initialized object
    return {
      id: 0,
      courseName: '',
      courseCode: '',
      startDate:'',
      price:0,
      starRating:0,
      
    };
  }
}

