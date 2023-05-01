import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { ModalService } from '../shared/services/modal.service';
import { UserData } from '../shared/services/user-data';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css']
})
export class InteractionsComponent implements OnInit {
  userList: Array<UserData> = [];

  @Input() interation: String = "";

  constructor(public afs: AngularFirestore, public getUserService: GetUserService, public modalService: ModalService){}
  
  ngOnInit(): void {
    switch(this.interation.split('-')[0]){
      case 'likes':
        this.afs.collection("posts").doc(this.interation.split('-')[1]).ref.get().then((doc) => {
          var post: any = doc.data();
          post.likes.forEach((element: any) => {
            this.afs.collection("likes").doc(element).ref.get().then(async (doc) => {
              var like: any = doc.data();
              this.userList.push(await this.getUserService.UserFromUID(like.uid));
            })
          });
          console.log(this.userList);
        })
        break;
      case 'dislikes':
        this.afs.collection("posts").doc(this.interation.split('-')[1]).ref.get().then((doc) => {
          var post: any = doc.data();
          post.dislikes.forEach((element: any) => {
            this.afs.collection("dislikes").doc(element).ref.get().then(async (doc) => {
              var like: any = doc.data();
              this.userList.push(await this.getUserService.UserFromUID(like.uid));
            })
          });
          console.log(this.userList);
        })
        break;
    }
  }
}
