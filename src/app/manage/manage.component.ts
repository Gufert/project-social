import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  constructor(public adminService: AdminService){}
}
