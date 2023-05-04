import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  doc: any;
  admins: string[] = [];
  owners: string[] = [];

  constructor(public afs: AngularFirestore, public modalService: ModalService) { 
    this.afs.collection("roles").doc("admin").ref.get().then((doc) => {
      this.doc = doc.data();
      if(doc){
        this.admins = this.doc.admins;
      }
    })
    this.afs.collection("roles").doc("owner").ref.get().then((doc) => {
      this.doc = doc.data();
      if(doc){
        this.owners = this.doc.owners;
      }
    })
  }

  addAdmin(uid: string){
    this.afs.collection("roles").doc("admin").update({admins: arrayUnion(uid)});
    this.modalService.close();
  }

  removeAdmin(uid: string){
    this.afs.collection("roles").doc("admin").update({admins: arrayRemove(uid)});
    this.modalService.close();
  }
}
