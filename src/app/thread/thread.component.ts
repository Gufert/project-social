import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit{
  post: any;
  user: UserData = {} as UserData;
  noPost: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, public getUserService: GetUserService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.afs.collection("posts").doc(params['postid']).ref.get().then(async (doc) => {
        this.post = doc.data();
        if(this.post){
          this.user = await this.getUserService.UserFromUID(this.post.uid);
          console.log(this.post, this.user);
        }
        else{
          this.noPost = true;
        }
      })
    })
  }
}
