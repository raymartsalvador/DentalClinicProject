import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  editMode = false;
  editSelectedUser: any;
  showAddUserPopup = false;
  newUser: any = {};
  isDuplicateEmail = false;
  deleteSelectedUser: any = null;
  showConfirmationPopup = false;
  constructor(
    private _AUTH: AuthService,
    private _USERCRUD: UserCrudService,
    private datePipe: DatePipe,
    private _ROUTER: Router
  ) {}
  //execution per life cycle
  ngOnInit() {
    this.getUsers();
  }

  // Method to trigger the confirmation pop-up
confirmDelete(user: any) {
  this.deleteSelectedUser = user;
  this.showConfirmationPopup = true;
}


  // Method to delete the user
  deleteUser() {
    if (this.deleteSelectedUser) {
      const userId = this.deleteSelectedUser._id;
      this._USERCRUD.deleteUser(userId).subscribe(
        () => {
          // User deleted successfully, update the users array or refresh the user list
          this.getUsers();

          // Close the confirmation pop-up
          this.cancelDelete();
        },
        (error) => {
          console.error('Error deleting user:', error);
          // Handle error, show an error message, etc.
        }
      );
    }
  }





  // Method to cancel the deletion and close the confirmation pop-up
  cancelDelete() {
    this.deleteSelectedUser = null;
    this.showConfirmationPopup = false;
  }

  //Add User (+)
  openAddUserPopup() {
    this.showAddUserPopup = true;
  }

  closeAddUserPopup() {
    this.isDuplicateEmail = false;
    this.showAddUserPopup = false;
  }

  addUser() {
    // Check if the email field is empty
    if (!this.newUser.email) {
      // Display an error message or handle the empty email scenario
      console.log('Email field cannot be empty.');
      return;
    }

    // Check if the user with the same email or name already exists
    const duplicateUser = this.users.find(
      (user) =>
        user.email === this.newUser.email ||
        (user.firstName === this.newUser.firstName &&
          user.lastName === this.newUser.lastName)
    );

    if (duplicateUser) {
      // Display an error message and indicate the error
      this.isDuplicateEmail = true;
      return;
    } else {
      this.showAddUserPopup = false;
      this._ROUTER.navigate(['/manage-user']);
    }

    // No duplicate user found and email field is not empty, proceed with registering the new user
    this.isDuplicateEmail = false; // Reset the error indicator
    this._AUTH.registerUser(this.newUser).subscribe(
      (res) => {
        this.showAddUserPopup = false;
        this._ROUTER.navigate(['/manage-user']);
        console.log(res);

        // Refresh the user list after adding a new user
        this.getUsers();
      },
      (err) => console.log(err)
    );
  }

  // download
  downloadPDF(user: any) {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Define the table columns
    const columns = ['Email', 'First Name', 'Last Name'];

    // Map the user data to rows
    const rows = [[user.email, user.firstName, user.lastName]];

    // Add the table to the document using the autoTable function
    autoTable(doc, { columns, body: rows });

    // Get the current date
    const currentDate = new Date();

    // Format the current date
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    // Extract the first name and last name from the user object
    const firstName = user.firstName;
    const lastName = user.lastName;

    // Generate the file name
    const fileName = `${lastName}_${firstName}_${formattedDate}.pdf`;

    // Add the header to the document content
    const header = `DATE: ${currentDate.toLocaleDateString()}`;
    doc.text(header, 10, 10);

    // Save the PDF file with the modified file name
    doc.save(fileName);
  }

  //editing phase
  cancelEdit() {
    this.editMode = false;
    this.editSelectedUser = null;
  }
  editUser(user: any) {
    this.editSelectedUser = user;
    this.editMode = true;
  }
  updateUser() {
    const token = localStorage.getItem('token') || '';

    if (!this.editSelectedUser) {
      console.error('No user selected');
      return;
    }

    this._USERCRUD
      .updateUser(this.editSelectedUser._id, this.editSelectedUser, token)
      .subscribe(
        (response) => {
          console.log('User updated successfully');
          // Handle success, show a success message, etc.
          this.editMode = false; // Hide the edit form
        },
        (error) => {
          console.error('Error updating user:', error);
          // Handle error, show an error message, etc.
        }
      );
  }
  //getting and viewing user phase
  getUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this._USERCRUD.getUsers(token).subscribe(
        (data: any[]) => {
          // Filter out the "admin" user from the retrieved user list
          this.users = data.filter(user => user.email !== 'admin@admin.com');

          // Initialize the filteredUsers array with all non-admin users
          this.filteredUsers = this.users;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Token not found in local storage.');
    }
  }

  //filtering phase(search)
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
    const userMonth = parsedDate.toLocaleString('default', { month: 'long' }).toLowerCase();
    const userYear = parsedDate.getFullYear().toString();
    const userDay = parsedDate.getDate().toString();

    if (searchYear && !searchMonth) {
      return userYear.includes(searchYear);
    } else if (!searchYear && searchMonth) {
      const formattedSearchMonth = searchMonth.toLowerCase();
      const formattedUserMonth = userMonth.toLowerCase();

      return (
        formattedUserMonth.includes(formattedSearchMonth) ||
        userDay.includes(formattedSearchMonth)
      );
    } else if (searchYear && searchMonth) {
      const formattedSearchMonth = searchMonth.toLowerCase();
      const formattedUserMonth = userMonth.toLowerCase();
      const formattedSearchYear = searchYear.toLowerCase();
      const formattedUserYear = userYear.toLowerCase();

      return (
        (formattedUserMonth.includes(formattedSearchMonth) &&
          formattedUserYear.includes(formattedSearchYear)) ||
        (formattedUserYear.includes(formattedSearchYear) &&
          formattedUserMonth.includes(formattedSearchMonth))
      );
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
