import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  userData: any;
  profileData: any;

  constructor(public afs: AngularFirestore) { }

  async UserFromUID(uid: string){
    await Promise.all([
      this.afs.collection("users").doc(uid).ref.get().then((doc) => {
        this.userData = doc.data();
      }),
      this.afs.collection("profiles").doc(uid).ref.get().then((doc) => {
        this.profileData = doc.data();
      })
    ])
    return {...this.userData, ...this.profileData};
  }
}
