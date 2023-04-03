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
  }
}