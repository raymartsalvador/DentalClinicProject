import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './Utilities/sign-in/sign-in.component';

const routes: Routes = [
  {path:"" ,component: HomeComponent},
  {path:"home" ,component: HomeComponent},
  {path:"contact" ,component: ContactUsComponent},
  {path:"services" ,component: HomeComponent},
  {path:"aboutUs" ,component: AboutComponent},
  {path:"signIn" ,component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
