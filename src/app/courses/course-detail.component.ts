import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  pageTitle = 'Course Details';
  errorMessage = '';
  
  courseInfo:course | undefined;
  //courses:course[]=[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCourse(id);
    }
  }
 

  getCourse(id: number): void {
    this.courseService.getCourse(id).subscribe({
      next: courseInfo => this.courseInfo = courseInfo,
      error: (err: string) => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/courses']);
  }

}
