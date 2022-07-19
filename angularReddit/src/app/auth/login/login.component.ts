import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login_request_payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    );


  }

  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(
      data => {
        console.log('Login successful');
      }
    );
  }





}
