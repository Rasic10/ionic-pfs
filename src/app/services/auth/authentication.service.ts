import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router"

const TOKEN_KEY = "auth-token";

interface AuthResponse {
  Status : String;
  Message : String;
  RedirectTo : String;
}

const AuthResponseStatus = {
	SUCCESS: "Success",
	FAIL: "Fail"
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenitcationState = new BehaviorSubject(false);

  constructor(private _storage: Storage, private _platform: Platform,
    private http: HttpClient, private router: Router) { 
    _storage.create();
    
    this._platform.ready().then(() => {
      this.checkToken();
    });
  }

  external_login(provider : String) {
    this.http.post<AuthResponse>(`https://localhost:5001/api/auth/external-login?providerName=${provider}`, {})
      .subscribe(res => {
        alert(res.Message);
        if (res.Status === AuthResponseStatus.SUCCESS){
          this.login(res.RedirectTo);
        }
        else {
          this.router.navigate([res.RedirectTo])
        }
      }, err => console.log(err))
    
  }

  login(redirectTo : String) { 

    this._storage.set(TOKEN_KEY, 'Bearer 123456').then(() => {
      this.authenitcationState.next(true);
    })
  }

  logout() { 
    this._storage.remove(TOKEN_KEY).then(() => {
      this.authenitcationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenitcationState.value;
  }

  checkToken() {
    return this._storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenitcationState.next(true);
      }
    });
  }
}
