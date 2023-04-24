import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  doc: any;
  admins: string[] = [];

  constructor(public afs: AngularFirestore) { 
    this.afs.collection("roles").doc("admin").ref.get().then((doc) => {
      this.doc = doc.data();
      if(doc){
        this.admins = this.doc.admins;
      }
    })
  }
}
