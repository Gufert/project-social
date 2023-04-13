import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../shared/services/modal.service';

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

  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, public getUserService: GetUserService, public title: Title, public modalService: ModalService){}

  ngOnInit(): void {
    this.title.setTitle("Project Social | Post")
    this.activatedRoute.params.subscribe(params => {
      this.afs.collection("posts").doc(params['postid']).ref.get().then(async (doc) => {
        this.post = doc.data();
        if(this.post){
          this.user = await this.getUserService.UserFromUID(this.post.uid);
          this.date = new Date(this.post.date * 1000);
          this.content = this.post.content;
        }
        else{
          this.noPost = true;
        }
      })
    })
  }
}
