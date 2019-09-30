import { Component, OnInit } from '@angular/core';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  constructor(private restService: RestService) {}

  ngOnInit() {
  }
  reset() {
    (this.restService.resetPassword(this.model).subscribe(
        data => {
          alert('Check your mail for new password!!' );
        }
      )
    );

  }
}
