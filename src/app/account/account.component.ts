import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userData: UserData = {} as UserData;

  constructor(public authService: AuthService, public getUserService: GetUserService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(async (user) => {
      if(user){
        this.userData = await this.getUserService.UserFromUID(user.uid);
      }
    })
  }
}
