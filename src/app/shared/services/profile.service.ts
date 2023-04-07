import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { GetUserService } from './get-user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  noUser: boolean = false;
  userData: any;
  profileData: any;
  user: UserData = {} as UserData;

  constructor(public afs: AngularFirestore, public getUserService: GetUserService) { }

  async getProfile(user: String){
    this.afs
      .collection("users",ref=>ref.where("lowerDN","==",user.toLocaleLowerCase()))
      .get()
      .subscribe(data => {
        data.forEach(el => this.userData = el.data());
        if(this.userData != null){
          this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
            this.profileData = doc.data();
            this.user = {...this.userData, ...this.profileData};
            this.user.joinDate = new Date(this.user.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
            console.log(this.user);
          })
        }
        else{
          this.noUser = true;
        }
    })
  }
}