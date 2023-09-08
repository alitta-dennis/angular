import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder,
              private http: HttpClient, 
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }
  
 /*  login(){
    this.http.get<any>("http://localhost:3000/signupUsersList")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["home"])
      }else{
        alert("user not found")
      }
    },err=>{
      alert("Something went wrong")
    })
  }
 */
  login() {
    console.log(this.loginForm.value)
    this.http.get<any>("http://localhost:3000/signupUsersList")
      .subscribe({
        next: (res) => {
          const user = res.find((a: any) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
          });
          if (user) {
            const fname = user.fname;
            alert(`Welcome`);
            this.authService.login();
            console.log("logged in");
            this.loginForm.reset();
            this.router.navigate(["courses"]);
          } else {
            alert("User not found");
          }
        },
        error: (err) => {
          alert("Something went wrong");
        }
      });
  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    
    this.router.navigate(['/login']);
  }
  
}
