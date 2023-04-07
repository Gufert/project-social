import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../shared/services/user-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  user: UserData = {} as UserData
  @Input() post?: any;
  constructor(public router: Router, public afs: AngularFirestore, public getUserService: GetUserService) { }

  async ngOnInit() {
    this.post.date = new Date(this.post.date.seconds * 1000);
    //console.log("post from input", this.post);
    this.user = await this.getUserService.UserFromUID(this.post.uid);
    console.log(this.post, this.user);
  }
  


  openThread(){
    //this.router.navigate(['']);
  }

  postClick(event: any, click: String){
    event.stopPropagation();
    console.log(click);
  }
}
