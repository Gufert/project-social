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
  message: string = "";

  @Input() interation: String = "";

  constructor(public afs: AngularFirestore, public getUserService: GetUserService, public modalService: ModalService){}
  
  ngOnInit(): void {
    this.message = "";
    switch(this.interation.split('-')[0]){
      case 'likes':
        this.getLD();
        break;
      case 'dislikes':
        this.getLD();
        break;
    }
  }

  getLD(){
    this.afs.collection("posts").doc(this.interation.split('-')[1]).ref.get().then((doc) => {
      var post: any = doc.data();
      if(post[this.interation.split('-')[0]].length > 0){
        post[this.interation.split('-')[0]].forEach((element: any) => {
          this.afs.collection(this.interation.split('-')[0]).doc(element).ref.get().then(async (doc) => {
            var ld: any = doc.data();
            this.userList.push(await this.getUserService.UserFromUID(ld.uid));
          })
        });
      }
      else{
        this.message = "This post has no " + this.interation.split('-')[0] + ".";
      }
    })
  }
}
