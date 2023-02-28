import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  currPop: string = '';
  onClose(){
    var pop = document.querySelector<HTMLElement>(".popup-container");
    if(pop){
      pop.style.display = "";
      var main = document.querySelector<HTMLElement>(".main");
      if(main){
        main.style.opacity = "1";
        main.style.pointerEvents = "auto";
      }
    }
  }
}
