import {Component} from '@angular/core';
import {RestService} from './service/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginService: RestService,
              private router: Router) {
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }
  goToLogout() {
    this.router.navigate(['logout']);
  }
/*  goToCart() {
    alert('safasf')
    this.router.navigate(['cartView']);
  }*/
  goToAdminPage() {
    this.router.navigate(['admin-users']);
  }
}
