import { Component } from '@angular/core';
import posts from "../../testing/testposts.json";

interface Posts{
  name: String;
  username: String;
  pfp: String;
  content: String;
  likes: Number;
  dislikes: Number;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  posts: Posts[] = posts
}
