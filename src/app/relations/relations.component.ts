import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit{
  userList: Array<UserData> = [];

  @Input() list: string = "";

  constructor(public profileService: ProfileService, public getUserService: GetUserService, public modal: ModalComponent) {}

  ngOnInit() {
    if(this.list == "followers"){
      this.profileService.user.followers.forEach(async (element) => {
        this.userList.push(await this.getUserService.UserFromUID(element))
      });
    }
    else if(this.list == "following"){
      this.profileService.user.following.forEach(async (element) => {
        this.userList.push(await this.getUserService.UserFromUID(element))
      });
    }
  }
}
