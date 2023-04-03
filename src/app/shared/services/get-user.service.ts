import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserData } from './user-data';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  userData: any;
  profileData: any;
  user: UserData = {} as UserData;

  constructor(public db: AngularFireDatabase, public afs: AngularFirestore) { }

  async UserFromUID(uid: string){
    await Promise.all([
      this.afs.collection("users").doc(uid).ref.get().then((doc) => {
        this.userData = doc.data();
      }),
      this.afs.collection("profiles").doc(uid).ref.get().then((doc) => {
        this.profileData = doc.data();
      })
    ]).then(() => {
        this.user = {...this.userData, ...this.profileData};
    })
    return this.user;
  }

  async UserFromLDN(lowerDN: String){
    await Promise.all([
      this.afs
      .collection("users",ref=>ref.where("lowerDN","==",lowerDN.toLocaleLowerCase()))
      .get()
      .subscribe(data => {
        data.forEach(el => this.userData = el.data());
        if(this.userData != null){
          this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
            this.profileData = doc.data();
          }).then(() => {
            this.user = {...this.userData, ...this.profileData};
          })
        }
      })
    ])
    return this.user
  }
}
