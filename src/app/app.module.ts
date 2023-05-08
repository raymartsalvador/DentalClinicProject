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
import { SpecialEventComponent } from './Utilities/special-event/special-event.component';
import { EventsComponent } from './Utilities/events/events.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';

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
    SpecialEventComponent,
    EventsComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
