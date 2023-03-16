import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(public authService: AuthService) {}
  count: Number = 0;
  remaining: Number = 256;


  ngOnInit(){
    this.transform();
  }

  transform(){
    var bar = document.querySelector<HTMLElement>(".bar");
    if(bar){
      if(this.count <= 256){
        bar.style.transform = "rotate("+ (45+(Number(this.count)*0.7)) +"deg)"
      }
    }
  }

  charCount(){
    var text = Number(document.querySelector<HTMLElement>(".content")?.innerText.length);
    this.count = text;
    this.transform();

    this.remaining = 256 - Number(this.count);
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