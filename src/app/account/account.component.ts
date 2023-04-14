import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  userData: UserData = {} as UserData;
  user: User = {} as User;

  constructor(public authService: AuthService, public getUserService: GetUserService) {}

  async ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user')!);
    if(user){
      this.userData = await this.getUserService.UserFromUID(user.uid);
    }
  }
}
