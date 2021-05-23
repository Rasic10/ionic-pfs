import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login();
  }

  loginWithFacebook() {
    this._authService.login();
  }

  loginWithGoogle() {
    this._authService.login();
  }
}
