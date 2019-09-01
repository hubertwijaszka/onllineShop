import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private restService: RestService) { }

  ngOnInit() {
    this.restService.logOut();
    this.router.navigate(['/']);
  }

}
