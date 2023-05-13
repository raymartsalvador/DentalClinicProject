import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Utilities/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignInComponent } from './Utilities/sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './Utilities/footer/footer.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ForgotPasswordComponent } from './Utilities/forgot-password/forgot-password.component';
import { SignUpComponent } from './Utilities/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashBoardComponent } from './Utilities/dash-board/dash-board.component';
import { AuthService } from './services/auth.service';
import { AdminGuard } from './admin.guard';
import { ManageServicesComponent } from './admin-exclusive/manage-services/manage-services.component';
import { ManageUsersComponent } from './admin-exclusive/manage-users/manage-users.component';
import { ManageScheduleComponent } from './admin-exclusive/manage-schedule/manage-schedule.component';
import { ManagePatientsComponent } from './admin-exclusive/manage-patients/manage-patients.component';
import { AppointmentsComponent } from './user-exclusive/appointments/appointments.component';
import { DatePipe } from '@angular/common';
import { UserCrudService } from './services/user-crud.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ContactUsComponent,
    SignInComponent,
    AboutComponent,
    FooterComponent,
    OurServicesComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    DashBoardComponent,
    ManageServicesComponent,
    ManageUsersComponent,
    ManageScheduleComponent,
    ManagePatientsComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,AuthService,AdminGuard,DatePipe,UserCrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
