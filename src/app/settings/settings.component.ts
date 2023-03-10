import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(public authService: AuthService, public modalService: ModalService) {}
}
