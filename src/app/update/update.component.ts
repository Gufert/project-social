import { Component, Input } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent{
  showPassword = false;
  showNewPassword = false;

  @Input() updateSender: string = "";

  constructor(
      public authService: AuthService
  ) { }

  toggle(){
    this.showPassword = !this.showPassword;
  }

  toggleNew(){
    this.showNewPassword = !this.showNewPassword;
  }

  placeholder(value1: string, value2: string){

  }
}
