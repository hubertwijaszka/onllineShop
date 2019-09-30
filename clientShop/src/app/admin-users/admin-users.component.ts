import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from './User';
import {RestService} from '../service/rest.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  columnsToDisplay = ['User Name', 'User Mail', 'Confirmed', 'Delete'];
  dataSource = new MatTableDataSource<User>();
  constructor(private restService: RestService, private roter: Router, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.restService.getUsers()
      .subscribe(users => this.dataSource.data = users);
  }
  saveUserMailChanges(event: any) {
    this.restService.changeUser(event.target.id, event.target.value)
      .subscribe();
  }

  deleteUser(username: string) {
    this.restService.deleteUser(username)
      .subscribe(
        x => console.log('Observer got a next value: ' + x),
        err => console.error('Observer got an error: ' + err),
        () => this.getUsers()
      );
  }
}
