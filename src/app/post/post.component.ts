import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  onClose(){
    var pop = document.querySelector<HTMLElement>(".popup");
    if(pop){
      pop.style.display = "";
      var main = document.querySelector<HTMLElement>(".main");
      if(main){
        main.style.pointerEvents = "auto";
      }
    }
  }
}
