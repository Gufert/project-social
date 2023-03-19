import { Component, OnInit } from '@angular/core';
import posts from "../../testing/testposts.json";
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/services/post';
import { AngularFirestore } from "@angular/fire/compat/firestore";

/* interface Posts{
  name: String;
  username: String;
  pfp: String;
  content: String;
  likes: Number;
  dislikes: Number;
} */

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
  
  constructor(public postService: PostService) {
    postService.getPosts()
  }

  posts: Post[] = this.postService.arrayOfPosts
  ngOnInit(): void {}
}
