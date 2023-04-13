import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit{
  count: Number = 0;
  remaining: Number = 127;

  @Input() postId: string = "";

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.transform();
  }

  transform(){
    var bar = document.querySelector<HTMLElement>(".bar");
    if(bar){
      if(Number(this.count) <= 127){
        bar.style.transform = "rotate("+ (45+(Number(this.count)*1.42)) +"deg)"
      }
    }
  }

  charCount(){
    var text = Number(document.querySelector<HTMLElement>(".content")?.innerText.length);
    this.count = text;
    this.transform();

    this.remaining = 127 - Number(this.count);
    var progress = document.querySelector<HTMLElement>(".progress");
    if(progress){
      if(Number(this.remaining) < 0){
        progress.style.color = "red";
      }
      else{
        progress.style.color = "";
      }
    }
    return text
  }

  reply(){

  }
}
