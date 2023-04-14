import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../shared/services/modal.service';
import { InteractionsService } from '../shared/services/interactions.service';
import { Reply } from '../shared/services/reply';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit{
  post: any;
  user: UserData = {} as UserData;
  noPost: boolean = false;
  content: string = "";
  date: any;
  reply: Reply = {} as Reply;
  replyUser: UserData = {} as UserData;
  replies: any[] = [];


  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, public getUserService: GetUserService, 
    public title: Title, public modalService: ModalService, public interactions: InteractionsService){}

  ngOnInit(): void {
    this.title.setTitle("Project Social | Post")
    this.activatedRoute.params.subscribe(params => {
      this.afs.collection("posts").doc(params['postid']).ref.get().then(async (doc) => {
        this.post = doc.data();
        if(this.post){
          this.user = await this.getUserService.UserFromUID(this.post.uid);
          this.date = new Date(this.post.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
          this.content = this.post.content;
          this.title.setTitle("Project Social | Post by @" + this.user.displayName);
          this.fetchReplies()
        }
        else{
          this.noPost = true;
        }
      })
    })
  }

  fetchReplies(){
    this.post.replies.forEach(async (element: any) => {
      await this.afs.collection("replies").doc(element).ref.get().then(async (doc) => {
        this.reply = <Reply>doc.data();
        await Promise.all([
          this.replyUser = await this.getUserService.UserFromUID(this.reply.uid)
        ]).then(() => {
          this.replies.push({...this.reply, ...this.replyUser});
        })
      })
    });
  }
}
