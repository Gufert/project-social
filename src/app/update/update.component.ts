import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  showPassword = false;

  @Input() updateSender: string = "";

  toggle(){//now this is something else
    this.showPassword = !this.showPassword;
  }
  constructor(
    public authService: AuthService
  ) { }
 
  ngOnInit(): void {
    console.log(this.updateSender);
  }

  updateEmail(){
    console.log("email");
  }
  updatePassword(){
    console.log("password");
  }
  updateUsername(){
    console.log("username")
  }
}
