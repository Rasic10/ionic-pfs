import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {}

  standardAuth() {
    // preko postmana uzmem kod za fetch js 
  }
}
