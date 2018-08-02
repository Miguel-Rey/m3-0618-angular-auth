import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { ChordsService } from '../services/chords';
import { SingleTabComponent } from './single-tab/single-tab.component';
import { ChordPipe } from './pipes/chord.pipe';
import { ChordsImageService } from '../services/chordImage';
import { ProfileComponent } from './profile/profile.component'
import { ChordContentComponent } from './chord-content/chord-content.component';
import { LastFMService } from '../services/lastfm';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SingleTabComponent,
    ChordPipe,
    ProfileComponent,
    ChordContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [SessionService, ChordsService, ChordsImageService, LastFMService],
  bootstrap: [AppComponent]
})
export class AppModule { }
