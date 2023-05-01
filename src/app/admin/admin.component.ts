import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public adminService: AdminService, public authService: AuthService) {}
}
