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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  user: UserData = {} as UserData
  @Input() post?: any;

  constructor(
    public as: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    public getUserService: GetUserService,
    public likeDislikeService: LikeDislikeService,
    public modalService: ModalService
    ) {

  }

  like: Like = new Like();
  dislike: Dislike = new Dislike();

  async ngOnInit() {
    this.post.date = new Date(this.post.date.seconds * 1000);
    this.user = await this.getUserService.UserFromUID(this.post.uid);
  }
  


  openThread(){
    //this.router.navigate(['']);
  }

  postClick(event: any, click: String){
    event.stopPropagation();
    if(click == 'like'){
      this.like = {
        uid: this.as.userData.uid,
        pid: this.post.pid,
        date: new Date()
      }
      this.likeDislikeService.likePost(this.like)
    }
    if(click == 'dislike'){
      this.dislike = {
        uid: this.as.userData.uid,
        pid: this.post.pid,
        date: new Date()
      }
      this.likeDislikeService.dislikePost(this.dislike)
    }
    if(click == 'reply'){
      this.modalService.open('reply:' + this.post.pid)
    }
  }
}
