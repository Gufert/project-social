import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public postService: PostService
    ) {}
    
  count: Number = 0;
  remaining: number = 255;

  ngOnInit() {
    this.transform();
  }

  transform(){
    var bar = document.querySelector<HTMLElement>(".bar");
    if(bar){
      if(Number(this.count) <= 255){
        bar.style.transform = "rotate("+ (45+(Number(this.count)*0.7)) +"deg)"
      }
    }
  }

  charCount(text: String){
    this.count = text.length;
    this.transform();

    this.remaining = 255 - Number(this.count);
    var progress = document.querySelector<HTMLElement>(".progress");
    if(progress){
      if(this.remaining < 0){
        progress.style.color = "red";
      }
      else{
        progress.style.color = "";
      }
    }
  }
}