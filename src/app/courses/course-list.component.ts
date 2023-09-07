import { Component, OnInit } from '@angular/core';

import { course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  pageTitle = 'Course List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCourses = this.listFilter ? this.performFilter(this.listFilter) : this.courses;
  }

  filteredCourses: course[] = [];
  courses: course[] = [];

  constructor(private courseService: CourseService) { }

  performFilter(filterBy: string): course[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.courses.filter((Course: course) =>
      Course.courseName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Checks both the product name and tags
  // performFilter2(filterBy: string): course[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.courses.filter((Course: course) =>
  //     Course.courseName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
  //       (Course.tags && Course.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  // }

  // toggleImage(): void {
  //   this.showImage = !this.showImage;
  // }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.filteredCourses = this.courses;
      },
      error: err => this.errorMessage = err
    });
  }
}
