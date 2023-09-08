import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      // fname: ["", Validators.required],
      // phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }


  signUp() {
    if (this.signUpForm.valid){
    console.log(this.signUpForm.value);
    this.http.post<any>("http://localhost:3000/signupUsersList", this.signUpForm.value)
      .subscribe({
        next: (res) => {
          alert('Sign Up Successful');
          this.signUpForm.reset();
          this.router.navigate(["login"]);
        },
        error: (err) => {
          alert("Something went wrong");
        }
      });
    }
    else {
      alert("Please enter all the required values.")
    }
  }
  

}
