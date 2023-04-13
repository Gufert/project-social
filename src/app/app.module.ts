import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from "./shared/services/auth.service";

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { PromptComponent } from './prompt/prompt.component';
import { ThreadComponent } from './thread/thread.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { EditComponent } from './edit/edit.component';
import { RelationsComponent } from './relations/relations.component';
import { ModalComponent } from './modal/modal.component';
import { AccountComponent } from './account/account.component';
import { ModalService } from './shared/services/modal.service';
import { ProfilesComponent } from './profiles/profiles.component';
import { UpdateComponent } from './update/update.component';
import { ThemesComponent } from './themes/themes.component';
import { CrudComponent } from './crud/crud.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { animationFrames } from 'rxjs';
import { ProfileService } from './shared/services/profile.service';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ImageComponent } from './image/image.component';
import { AlertComponent } from './alert/alert.component';
import { ReplyComponent } from './reply/reply.component';

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
    PromptComponent,
    ThreadComponent,
    SignupComponent,
    PostsComponent,
    EditComponent,
    RelationsComponent,
    ModalComponent,
    AccountComponent,
    ProfilesComponent,
    UpdateComponent,
    ThemesComponent,
    CrudComponent,
    BookmarksComponent,
    ImageComponent,
    AlertComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: SearchComponent, title: 'Project Social | Search'},
      {path: 'feed', component: FeedComponent, title: 'Project Social | Home'},
      {path: 'search', component: SearchComponent, title: 'Project Social | Search'},
      {path: 'bookmarks', component: BookmarksComponent, title: 'Project Social | Bookmarks'},
      {path: 'settings', component: SettingsComponent, title: 'Project Social | Settings'},
      {path: ':user', component: ProfileComponent, children: [
        {path: 'replies', component: ProfileComponent},
        {path: 'top', component: ProfileComponent},
        {path: 'likes', component: ProfileComponent}
      ]},
      {path: 'post/:postid', component: ThreadComponent}
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        progressBar:true
        
      }
    )
  ],
  providers: [
    AuthService,
    ModalService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


