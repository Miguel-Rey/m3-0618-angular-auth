import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingleTabComponent } from './single-tab/single-tab.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchHolderComponent } from './search-holder/search-holder.component';
import { TunerComponent } from './tuner/tuner.component';

export const routes: Routes = [
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'single/:id', component: SingleTabComponent},
  { path: 'favourites', component: ProfileComponent},
  { path: 'search/:query', component: SearchHolderComponent}
];
