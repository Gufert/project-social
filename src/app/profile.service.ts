import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

interface Profile {
  profileName: String;
  displayName: String;
  photoURL: String;
  banner: String;
  bio: String;
  location: String,
  link: String,
  joinDate: String,
  following: Number,
  followers: Number
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
    .collection("users",ref=>ref.where("lowerDN","==",user.toLocaleLowerCase()))
    .get()
    .subscribe(data => {
      data.forEach(el => this.userData = el.data());
      if(this.userData != null){
        this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
          this.profileData = doc.data();
          this.profile.profileName = this.profileData.profileName;
          this.profile.displayName = this.userData.displayName;
          this.profile.photoURL = this.userData.photoURL;
          this.profile.banner = this.profileData.bannerURL;
          this.profile.bio = this.profileData.bio;
          this.profile.location = this.profileData.location;
          this.profile.link = this.profileData.link;
          this.profile.joinDate = new Date(this.profileData.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
          this.profile.following = this.profile.following;
          this.profile.followers = this.profile.followers;
        })
      }
      else{
        this.noProfile = true;
      }
    })
  }
}
