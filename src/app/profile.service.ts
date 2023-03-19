import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

interface Profile {
  name: String;
  username: String;
  pfp: String;
  banner: String;
  bio: String;
  location: String,
  link: String,
  joinDate: String,
  followingCount: Number,
  followerCount: Number
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showProfile: Boolean = false;
  userData: any;
  profileData: any;
  profile: Profile = {} as Profile;
  noProfile: boolean = false;

  constructor(public db: AngularFireDatabase, public afs: AngularFirestore) { }

  getProfile(user: String){
    this.afs
    .collection("users",ref=>ref.where("displayName","==",user))
    .get()
    .subscribe(data => {
      data.forEach(el => this.userData = el.data());
      if(this.userData != null){
        this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
          this.profileData = doc.data();
          this.profile.name = this.profileData.profileName;
          this.profile.username = this.userData.displayName;
          this.profile.pfp = this.userData.photoURL;
          this.profile.banner = this.profileData.bannerURL;
          this.profile.bio = this.profileData.bio;
          this.profile.location = this.profileData.location;
          this.profile.link = this.profileData.link;
          this.profile.joinDate = new Date(this.profileData.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
        })
      }
      else{
        this.noProfile = true;
      }
    })
  }
}
