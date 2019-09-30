import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model: any = {};
  constructor(private router: Router,
              private restService: RestService) { }

  ngOnInit() {
  }

  registration() {
    (this.restService.registartion(this.model).subscribe(
        data => {
          this.router.navigate(['login']);
          alert('you are registered, activate your account now');
        }
      )
    );

  }

}
