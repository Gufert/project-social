import { Component } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { AuthService } from '../shared/services/auth.service';
import { UserData } from '../shared/services/user-data';
import { GetUserService } from '../shared/services/get-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(public authService: AuthService, public modalService: ModalService, public getUserService: GetUserService) {}
  user: UserData = {} as UserData;
}
