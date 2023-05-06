import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Utilities/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { OurStaffComponent } from './our-staff/our-staff.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignInComponent } from './Utilities/sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './Utilities/footer/footer.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { RegisterComponent } from './Utilities/register/register.component';
import { ForgotPasswordComponent } from './Utilities/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    OurStaffComponent,
    ContactUsComponent,
    SignInComponent,
    AboutComponent,
    FooterComponent,
    OurServicesComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
