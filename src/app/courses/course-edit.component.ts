import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { course } from './course';
import { CourseService } from './course.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  pageTitle = 'Course Edit';
  errorMessage = '';
  courseForm!: FormGroup;

  Course!: course;
  private sub!: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // get tags(): FormArray {
  //   return this.courseForm.get('tags') as FormArray;
  // }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      courseName: {
        required: 'Course name is required.',
        minlength: 'Course name must be at least three characters.',
        maxlength: 'Course name cannot exceed 50 characters.'
      },
      courseCode: {
        required: 'Course code is required.'
      }
      // starRating: {
      //   range: 'Rate the product between 1 (lowest) and 5 (highest).'
      // }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      courseCode: ['', Validators.required],
      // starRating: ['', NumberValidators.range(1, 5)],
      // imageUrl: [''],
      // tags: this.fb.array([]),
      // description: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getCourse(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.courseForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.courseForm);
    });
  }

  // addTag(): void {
  //   this.tags.push(new FormControl());
  // }

  // deleteTag(index: number): void {
  //   this.tags.removeAt(index);
  //   this.tags.markAsDirty();
  // }

  getCourse(id: number): void {
    console.log(id)
    this.courseService.getCourse(id)
      .subscribe({
        next: (Course: course) => this.displayCourse(Course),
        error: err => this.errorMessage = err
      });
  }

  displayCourse(Course: course): void {
    if (this.courseForm) {
      this.courseForm.reset();
    }
    this.Course = Course;

    if (this.Course.id === 0) {
      this.pageTitle = 'Add Course';
    } else {
      this.pageTitle = `Edit Course: ${this.Course.courseName}`;
    }

    // Update the data on the form
    this.courseForm.patchValue({
      courseName: this.Course.courseName,
      courseCode: this.Course.courseCode,
      // starRating: this.product.starRating,
      // imageUrl: this.product.imageUrl,
      // description: this.product.description
    });
    //this.courseForm.setControl('tags', this.fb.array(this.Course.tags || []));
  }

  deleteCourse(): void {
    if (this.Course.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else if (this.Course.id) {
      if (confirm(`Are you sure you want to delete the course, ${this.Course.courseName}?`)) {
        this.courseService.deleteCourse(this.Course.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      if (this.courseForm.dirty) {
        const p = { ...this.Course, ...this.courseForm.value };

        if (p.id === 0) {
          this.courseService.createCourses(p)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.courseService.updateCourse(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }
}
