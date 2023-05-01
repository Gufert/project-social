import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { ModalService } from './shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './shared/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-social';

  constructor(public authService: AuthService, public modalService: ModalService, private toastr: ToastrService, public adminService: AdminService) {}

  ngOnInit() {}
  ShowSuccess(){
    this.toastr.success('Success login ')
  }
}
