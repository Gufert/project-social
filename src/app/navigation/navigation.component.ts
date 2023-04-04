import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(public authService: AuthService, protected modalService: ModalService) {}
}

