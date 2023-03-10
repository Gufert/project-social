import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  showPassword = false;

  toggle(){//now this is something else
    this.showPassword = !this.showPassword;
  }
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
