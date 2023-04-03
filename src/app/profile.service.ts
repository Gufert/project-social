import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserData } from './shared/services/user-data';
import { GetUserService } from './shared/services/get-user.service';

interface Profile {
  profileName: String;
  displayName: String;
  photoURL: String;
  bannerURL: String;
  bio: String;
  location: String,
  link: String,
  joinDate: String,
  following: Number,
  followers: Number,
  uid: String
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showProfile: Boolean = false;
  userData: any;
  profileData: any;
  profile: UserData = {} as UserData;
  noUser: boolean = false;
  user: UserData = {} as UserData;

  constructor(public db: AngularFireDatabase, public afs: AngularFirestore, public getUserService: GetUserService) { }

  async getProfile(user: String){
    this.user = await this.getUserService.UserFromLDN(user);
    this.user.joinDate = new Date(this.user.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this

    // });
    // this.afs
    // .collection("users",ref=>ref.where("lowerDN","==",user.toLocaleLowerCase()))
    // .get()
    // .subscribe(data => {
    //   data.forEach(el => this.userData = el.data());
    //   if(this.userData != null){
    //     this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
    //       this.profileData = doc.data();
    //       this.user = {...this.userData, ...this.profileData};
    //       this.user.joinDate = new Date(this.profileData.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
    //       console.log(this.user);
    //     })
    //   }
    //   else{
    //     this.noUser = true;
    //   }
    // })
  }
}

// this.profileData = doc.data();
// this.profile.profileName = this.profileData.profileName;
// this.profile.displayName = this.userData.displayName;
// this.profile.photoURL = this.userData.photoURL;
// this.profile.bannerURL = this.profileData.bannerURL;
// this.profile.bio = this.profileData.bio;
// this.profile.location = this.profileData.location;
// this.profile.link = this.profileData.link;
// this.profile.joinDate = new Date(this.profileData.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
// this.profile.following = this.profileData.following;
// this.profile.followers = this.profileData.followers;
// this.profile.uid = this.profileData.uid;