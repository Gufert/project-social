import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../shared/services/modal.service';
import { InteractionsService } from '../shared/services/interactions.service';

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
        }
        else{
          this.noPost = true;
        }
      })
    })
  }
}
