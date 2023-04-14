import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  count: Number = 0;
  remaining: number = 255;
  degree: Number = 45;

  constructor(public authService: AuthService, public postService: PostService) {}

  charCount(text: String){
    this.count = text.length;
    this.remaining = 255 - Number(this.count);
    if(Number(this.count) <= 255){
      this.degree = 45 + (Number(this.count)*0.7);
    }
  }
}