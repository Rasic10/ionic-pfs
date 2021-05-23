import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _platform: Platform, private _authService: AuthenticationService, private _router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      this._authService.authenitcationState.subscribe(state => {
        console.log("changed auth state: " + state);
        if (state) {
          this._router.navigate(['tabs', 'images']);
        } else {
          console.log(this._router);
          this._router.navigate(['login']);
        }
      })
    })
  }
}
