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
import { Observable } from 'rxjs';
import { User } from '../shared/services/user';
import { QuerySnapshot } from 'firebase/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
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
    this.post.date = new Date(this.post.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
    this.user = await this.getUserService.UserFromUID(this.post.uid);
  }

  checkIfLDExists(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afs.collection(path, ref => 
        ref.where('uid', '==', this.as.userData.uid)
           .where('pid', '==', this.post.pid))
        .get()
        .subscribe((querySnapshot) => {
          resolve(!querySnapshot.empty);
        }, (error) => {
          reject(error);
        });
    });
  }

  openThread() {
    //this.router.navigate(['']);
  }

  async postClick(event: any, click: String) {
    event.stopPropagation();

    if (click == 'like') {
      this.checkIfLDExists("likes").then((exists) => {
        if (exists) {
            console.log("delete like")
            this.afs.collection("likes").ref.where('uid', '==', this.as.userData.uid)
              .where('pid', '==', this.post.pid)
              .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const docID = doc.id
                  this.afs.collection("likes").doc(docID).delete();
                });
              })
              .catch((error) => {
                console.log('Error getting documents: ', error);
              });
          }
          else {
            console.log("new like")
            this.ld = {
              uid: this.as.userData.uid,
              pid: this.post.pid,
              date: new Date()
            }
            this.likeDislikeService.likePost(this.ld)
          }
      })
    }
    if (click == 'dislike') {
      this.checkIfLDExists("dislikes").then((exists) => {
        if (exists) {
            console.log("delete dislike")
            this.afs.collection("dislikes").ref.where('uid', '==', this.as.userData.uid)
              .where('pid', '==', this.post.pid)
              .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const docID = doc.id
                  this.afs.collection("dislikes").doc(docID).delete();
                });
              })
              .catch((error) => {
                console.log('Error getting documents: ', error);
              });
          }
          else {
            console.log("new dislike")
            this.ld = {
              uid: this.as.userData.uid,
              pid: this.post.pid,
              date: new Date()
            }
            this.likeDislikeService.dislikePost(this.ld)
          }
      })
    }
    if (click == 'reply') {
      this.modalService.open('reply:' + this.post.pid)
    }
  }
}
