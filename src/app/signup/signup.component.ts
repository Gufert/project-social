import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  showPassword = false;

  toggle(){//now this is something else
    this.showPassword = !this.showPassword;
  }
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}