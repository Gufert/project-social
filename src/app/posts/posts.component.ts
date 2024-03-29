import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../shared/services/user-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { Like } from '../shared/services/like';
import { Dislike } from '../shared/services/dislike';
import { LikeDislikeService } from '../shared/services/like-dislike.service';
import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';
import { QuerySnapshot, arrayRemove } from 'firebase/firestore';
import { InteractionsService } from '../shared/services/interactions.service';
import { AdminService } from '../shared/services/admin.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  user: UserData = {} as UserData
  @Input() post?: any;

  constructor(public authService: AuthService, public router: Router, public afs: AngularFirestore, public getUserService: GetUserService,
              public interactionsService: InteractionsService, public modalService: ModalService, public adminService: AdminService) {}

  async ngOnInit() {
    this.post.date = new Date(this.post.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
    this.user = await this.getUserService.UserFromUID(this.post.uid);
  }

  async postClick(event: any, click: String) {
    event.stopPropagation();

    if(this.authService.userData != null){
      switch (click){
        case 'reply':
          this.modalService.open('reply:' + this.post.pid);
          break;
        case 'like':
          let likeVal = await this.interactionsService.like(this.post.pid);
          if(likeVal == -1){
            this.post.likes.pop();
          }
          else{
            this.post.likes.push("1");
          }
          break;
        case 'dislike':
          let dislikeVal = await this.interactionsService.dislike(this.post.pid);
          if(dislikeVal == -1){
            this.post.dislikes.pop();
          }
          else{
            this.post.dislikes.push("1");
          }
          break;
        case 'bookmark':
          this.interactionsService.bookmark(this.post.pid);
          break;
        case 'delete':
          this.modalService.open('delete:' + 'post-' + this.post.pid);
          break;
      }
    }
    else if(click == 'share'){
      this.interactionsService.share(this.post.pid);
    }
    else{
      this.modalService.open('alert');
    }
  }
}
