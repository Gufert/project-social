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

  async UserFromLDN(lowerDN: String){
    // await Promise.all([
    //   this.afs
    //   .collection("users",ref=>ref.where("lowerDN","==",lowerDN.toLocaleLowerCase()))
    //   .get()
    //   .subscribe(data => {
    //     data.forEach(el => this.userData = el.data());
    //     if(this.userData != null){
    //       this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
    //         this.profileData = doc.data();
    //         console.log({...this.userData, ...this.profileData});
    //       })
    //     }
    //   })
    // ])
    
    // console.log({...this.userData, ...this.profileData});
    // return {...this.userData, ...this.profileData};
  }
}
