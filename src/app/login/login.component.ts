import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { browserStorage } from '../services/browserStorage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean;
  message: string;
  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  formControlValue(control: string): string {
    return this.loginForm.get(control).value;
  }

  onSubmit() {
    let payload = {
      emailId: this.formControlValue('email'),
      password: this.formControlValue('password')
    }
    this.authService.login(payload)
      .subscribe(token => {
        this.error = false;
        this.message = 'Loggen In';
        setTimeout(() => {
          this.error = undefined;
          this.router.navigate(['dashboard']);
        }, 3000);
        },
        err => {
          this.error = true;
          this.message = err.message ? err.message : 'not a valid user';
          setTimeout(() => {
            this.error = undefined;
          }, 3000);
          // TODO: Show Erro Message to user
          console.error('Observer got an error: ' + err);
        },
        () => {
          console.log('Observer got a complete notification');
        }
      );
  }
}

export interface LoginResponse {
  token: string;
}
