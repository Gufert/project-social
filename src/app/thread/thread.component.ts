import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../shared/services/modal.service';
import { InteractionsService } from '../shared/services/interactions.service';
import { Reply } from '../shared/services/reply';
import { Post } from '../shared/services/post';
import { AuthService } from '../shared/services/auth.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit{
  post: any;
  user: UserData = {} as UserData;
  noPost: boolean = false;
  reply: any;
  replyData: Array<Reply> = [];
  replyUser: UserData = {} as UserData;
  replies: any[] = [];


  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, public getUserService: GetUserService, public adminService: AdminService,
    public title: Title, public modalService: ModalService, public interactions: InteractionsService, public authService: AuthService){}

  ngOnInit(): void {
    this.title.setTitle("Project Social | Post")
    this.activatedRoute.params.subscribe(params => {
      this.afs.collection("posts").doc(params['postid']).ref.get().then(async (doc) => {
        this.post = doc.data();
        if(this.post){
          this.user = await this.getUserService.UserFromUID(this.post.uid);
          this.post.date = new Date(this.post.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
          this.title.setTitle("Project Social | Post by @" + this.user.displayName);
          this.post.replies.forEach((element: any) => {
            this.afs.collection("replies").doc(element).ref.get().then(async (doc) => {
              this.reply = doc.data();
              this.reply.date = new Date(this.reply.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
              this.replies.push({...this.reply, ...await this.getUserService.UserFromUID(this.reply.uid)})
            })
          })
        }
        else{
          this.noPost = true;
        }
      })
    })
  }

  async interact(type: string){
    switch (type){
      case "like":
        let likeVal = await this.interactions.like(this.post.pid);
        if(likeVal == -1){
          this.post.likes.pop();
        }
        else{
          this.post.likes.push("1");
        }
        break;
      case "dislike":
        let dislikeVal = await this.interactions.dislike(this.post.pid);
        if(dislikeVal == -1){
          this.post.dislikes.pop();
        }
        else{
          this.post.dislikes.push("1");
        }
        break;
    }
  }
}