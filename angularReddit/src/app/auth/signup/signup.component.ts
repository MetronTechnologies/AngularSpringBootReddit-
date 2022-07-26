import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup_request_payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      username: "",
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required)
      }
    );
  }

  signupForm!: FormGroup;
  signupRequestPayload!: SignupRequestPayload;

  signup(){
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(
      () => {
        console.log('Signup Successful');
      },
      () => {
        console.log('Signup Failed')
      }
    );

  }








}
