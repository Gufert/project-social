import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
