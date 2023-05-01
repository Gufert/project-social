import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(public authService: AuthService, protected modalService: ModalService, public adminService: AdminService) {}
}

