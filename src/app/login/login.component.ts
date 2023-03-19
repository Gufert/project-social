import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showPassword = false;

  toggle(){//now this is something else
    this.showPassword = !this.showPassword;
  }
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit(){}
}
