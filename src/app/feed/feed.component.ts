import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/services/post';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy{
  userSubscribe: Subscription | undefined;

  constructor(public postService: PostService, public authService: AuthService, public afAuth: AngularFireAuth) {}

  posts: Post[] = this.postService.arrayOfPosts;

  ngOnInit(): void {
    this.userSubscribe = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.postService.getFeed()
      }
    });
  }

  ngOnDestroy(): void {
    this.posts = [];
    this.postService.arrayOfPosts = [];
    this.postService.noFeed = false;
    this.postService.noFollowing = false;
    this.userSubscribe?.unsubscribe();
  }
}
