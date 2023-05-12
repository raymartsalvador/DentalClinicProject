import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './Utilities/sign-in/sign-in.component';
import { SignUpComponent } from './Utilities/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthService } from './services/auth.service';
import { OurServicesComponent } from './our-services/our-services.component';
import { AdminGuard } from './admin.guard';
import { DashBoardComponent } from './Utilities/dash-board/dash-board.component';
import { ManageServicesComponent } from './admin-exclusive/manage-services/manage-services.component';
import { ManageUsersComponent } from './admin-exclusive/manage-users/manage-users.component';
import { ManageScheduleComponent } from './admin-exclusive/manage-schedule/manage-schedule.component';
import { ManagePatientsComponent } from './admin-exclusive/manage-patients/manage-patients.component';
import { AppointmentsComponent } from './user-exclusive/appointments/appointments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'services', component: OurServicesComponent },
  { path: 'aboutUs', component: AboutComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'dashBoard', component: DashBoardComponent },
  {
    path: 'manage-services',
    component: ManageServicesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'manage-schedule',
    component: ManageScheduleComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'manage-patients',
    component: ManagePatientsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService, AdminGuard],
})
export class AppRoutingModule {}
