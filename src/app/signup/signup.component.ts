import { Component } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword = false;
  userError = "";

  toggle(){//now this is something else
    this.showPassword = !this.showPassword;
  }
  constructor(public authService: AuthService, public afs: AngularFirestore) { }

  async signUp(userEmail: string, userPassword: string, userName: string){
    this.userError = "";

    if(/^[a-z0-9_]+$/.exec(userName) && userName.length >=3 && userName.length <= 15){
      await this.afs.collection("users").ref.where("lowerDN","==",userName.toLocaleLowerCase()).get().then((doc) => {
        if(!doc){
          this.authService.SignUp(userEmail, userPassword, userName);
        }
        else{
          this.userError = "The username " + userName + " is alread taken."
        }
      });
    }
    else{
      this.userError = "Invalid username: Username can only contain letters, numbers, and underscores and must be between 3 and 15 characters."
    }
  }
}