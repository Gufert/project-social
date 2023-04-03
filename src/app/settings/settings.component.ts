import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
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
  user: UserData = {} as UserData

  async test(){
    this.user = await this.getUserService.UserFromUID("rjYDxcOiKlU65kXtDYYEK0VQq7y1");
    console.log(this.user);
    //this.getUserService.UserFromLDN("Luigi");
  }
}
