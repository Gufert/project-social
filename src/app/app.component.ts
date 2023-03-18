import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-social';

  constructor(public authService: AuthService , private toastr: ToastrService) {}

  ngOnInit() {}
  ShowSuccess(){
    this.toastr.success('Success login ')
  }
}
