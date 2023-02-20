import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  onPost(){
    var pop = document.querySelector<HTMLElement>(".popup-container");
    if(pop){
      pop.style.display = "block";
      var main = document.querySelector<HTMLElement>(".main");
      if(main){
        main.style.opacity = ".5";
        main.style.pointerEvents = "none";
      }
    }
  }
}

