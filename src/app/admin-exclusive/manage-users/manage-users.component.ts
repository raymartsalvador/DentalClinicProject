import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  providers: [DatePipe],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = []; // Array to hold the filtered users
  searchQuery = '';
  selectedUser: any;

  constructor(private _USERCRUD: UserCrudService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getUsers();
  }
  editUserDetails(user: any) {
    // Perform actions to initiate the edit mode for the user details
    // This can include displaying a form or navigating to a new page for editing
    console.log('Editing user:', user);
  }
  getUsers() {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      this._USERCRUD.getUsers(token).subscribe(
        (data: any[]) => {
          this.users = data;
          this.filteredUsers = data; // Initialize the filteredUsers array with all users
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Token not found in local storage.');
    }
  }


  onSearch() {
    // Filter the users based on the search query
    if (this.searchQuery.trim() !== '') {
      const searchParts = this.searchQuery.trim().toLowerCase().split(' ');
      const searchMonth = searchParts[0];
      const searchYear = searchParts[1];

      this.filteredUsers = this.users.filter((user) => {
        const emailMatch = user.email
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const nameMatch = `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const dateAddedMatch = this.matchesMonthOrYear(
          user.dateAdded,
          searchMonth,
          searchYear
        );

        return emailMatch || nameMatch || dateAddedMatch;
      });
    } else {
      this.filteredUsers = this.users; // Reset the filtered users to all users when the search query is empty
    }
  }

  matchesMonthOrYear(
    date: string,
    searchMonth: string,
    searchYear: string
  ): boolean {
    const parsedDate = new Date(date);
    const userMonth = parsedDate
      .toLocaleString('default', { month: 'long' })
      .toLowerCase();
    const userYear = parsedDate.getFullYear().toString();

    if (searchYear && !searchMonth) {
      return userYear.includes(searchYear);
    } else if (!searchYear && searchMonth) {
      return userMonth.includes(searchMonth);
    } else if (searchYear && searchMonth) {
      return userYear.includes(searchYear) && userMonth.includes(searchMonth);
    }

    return false;
  }

  viewUserDetails(user: any) {
    this.selectedUser = user;
  }

  closePopup() {
    this.selectedUser = null;
  }
}
