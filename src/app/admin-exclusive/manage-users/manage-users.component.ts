import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private _USERCRUD: UserCrudService) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjQ1YjgyMmM0ZmMyYzk4OThiYWZkYzI5Iiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE2ODM4OTM3NjB9.XrG92hZOkhTdrNmJqiWHp2YyRPTxEl7UYCXB2VvftpM'; // Replace with the actual token
    this._USERCRUD.getUsers(token).subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
