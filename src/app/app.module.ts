import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FeedComponent,
    NavigationComponent,
    PostComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
