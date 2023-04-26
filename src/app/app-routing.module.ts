import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurStaffComponent } from './our-staff/our-staff.component';
const routes: Routes = [
  {path:"" ,component: HomeComponent},
  {path:"home" ,component: HomeComponent},
  {path:"about" ,component: AboutComponent},
  {path:"contact" ,component: ContactUsComponent},
  {path:"staff" ,component: OurStaffComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
