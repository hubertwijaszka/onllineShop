import { Component, OnInit } from '@angular/core';
import {RestService} from '../service/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    (this.restService.login(this.model).subscribe(
        data => {
          this.restService.isAdmin(this.model).subscribe();
          this.router.navigate(['']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
    );

  }
}
