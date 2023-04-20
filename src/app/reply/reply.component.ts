import { Component, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import { Reply } from '../shared/services/reply';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent{
  public dbPath = '/replies';
  count: Number = 0;
  remaining: Number = 127;
  reply: Reply = <Reply>{};
  degree: Number = 45;

  @Input() pid: string = "";

  constructor(public authService: AuthService, public afs: AngularFirestore, public modalService: ModalService) {}

  charCount(text: String){
    this.count = text.length;
    this.remaining = 127 - Number(this.count);
    if(Number(this.count) <= 127){
      this.degree = 45 + (Number(this.count)*1.42);
    }  
  }

  async makeReply(content: string){
    this.reply = {
      rid: "",
      pid: this.pid,
      uid: this.authService.userData.uid,
      date: new Date,
      content: content
    };
    return this.afs.collection<Reply>(this.dbPath).add({
      ...this.reply
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        rid: newDocID
      },
        {merge: true});
      this.afs.collection("posts").doc(this.pid).update({replies: arrayUnion(docRef.id)});
      this.modalService.close();
    }).catch((error) =>{
      console.error("Error", error)
    })
  }
}
