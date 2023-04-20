import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(public authService: AuthService, public afs: AngularFirestore) { }

  like(){

  }

  dislike(){

  }

  async bookmark(pid: string){
    this.afs.collection("bookmarks",ref=>ref.where("uid","==",this.authService.userData.uid).where("pid","==",pid)).get()
    .subscribe((data) => {
      if(data.size > 0){
        data.forEach((doc) => {
          var docData: any = doc.data();
          this.afs.collection("bookmarks").doc(docData.bid).delete();
        })
        return false;
      }
      else{
        return this.afs.collection("bookmarks").add({
          date: new Date(),
          uid: this.authService.userData.uid,
          pid: pid
        }).then((docRef) =>{
          let newDocID = docRef.id
          docRef.set({
            bid: newDocID},
            {merge: true});
        }).catch((error) =>{
          console.error("Error", error)
        })
      }
    });
  }

  share(){
    navigator.clipboard.writeText(window.location.toString());
  }
}
