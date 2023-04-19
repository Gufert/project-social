import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../shared/services/user-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { LikeDislike } from '../shared/services/like-dislike';
import { LikeDislikeService } from '../shared/services/like-dislike.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';

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
    public likeDislikeService: LikeDislikeService
    ) {

  }

  ld: LikeDislike = new LikeDislike();

  async ngOnInit() {
    this.post.date = new Date(this.post.date.seconds * 1000);
    //console.log("post from input", this.post);
    this.user = await this.getUserService.UserFromUID(this.post.uid);
    console.log(this.post, this.user);
  }
  


  openThread(){
    //this.router.navigate(['']);
  }

  async postClick(event: any, click: String){
    event.stopPropagation();
    this.afs.collection("likes",ref=>ref.where('likes', '==', this.as.userData.uid)
    .where('likes', '==', this.post.pid))
    .get()
    .subscribe((data) => {
      if(data.size > 0){
        data.forEach(async (el) => {
          this.res = el.data();
          this.user = await this.getUserService.UserFromUID(this.res.uid);
          this.results.push(this.user);
        })
      }
      else{
        this.noResults = true;
      }
    });
    if(click == 'like'){
      this.ld = {
        uid: this.as.userData.uid,
        pid: this.post.pid,
        date: new Date()
      }
      this.likeDislikeService.likePost(this.ld)
    }
    if(click == 'dislike'){
      this.ld = {
        uid: this.as.userData.uid,
        pid: this.post.pid,
        date: new Date()
      }
      this.likeDislikeService.dislikePost(this.ld)
    }
    if(click == 'reply'){

    }
    console.log(click);
  }
}
