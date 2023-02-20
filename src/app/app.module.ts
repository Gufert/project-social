import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { PopupComponent } from './popup/popup.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
      {
          requireDisplayName: false,
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      },
  ],
  //term of service
  tosUrl: '<your-tos-link>',
  //privacy url
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  //credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FeedComponent,
    NavigationComponent,
    PostComponent,
    SettingsComponent,
    SearchComponent,
    LoginComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule.forRoot([
      {path: '', component: FeedComponent},
      {path: 'search', component: SearchComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '**', component: ProfileComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


