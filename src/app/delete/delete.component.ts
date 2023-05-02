import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { InteractionsService } from '../shared/services/interactions.service';
import { Profile } from '../shared/services/profile';
import { arrayRemove } from 'firebase/firestore';
import { Post } from '../shared/services/post';
import { Reply } from '../shared/services/reply';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  type: string = ''
  id: string = ''
  @Input() deletion = ''

  constructor(
    public authService: AuthService,
    public postService: PostService,
    public router: Router,
    public afs: AngularFirestore,
    public getUserService: GetUserService,
    public interactionsService: InteractionsService,
    public modalService: ModalService
  ) {

  }

  ngOnInit() {
    this.type = this.deletion.split('-')[0]
    this.id = this.deletion.split('-')[1]
  }

  deletePost(pid: string) {

    this.afs.collection<Post>("posts").doc(pid)
      .get().subscribe((doc) => {
        const docID = doc.id;
        if (doc.exists) {
          const uid = doc.data()!.uid;

          if (doc.data()?.likes) {
            const likes = doc.data()!.likes;
            console.log(likes)
            likes.forEach((lid) => {
              this.afs.collection("likes").doc(lid).delete();
            })
          }
          else {
            console.log("error deleting likes")
          }

          if (doc.data()?.dislikes) {
            const dislikes = doc.data()!.dislikes;
            console.log(dislikes)
            dislikes.forEach((did) => {
              this.afs.collection("dislikes").doc(did).delete();
            })
          }
          else {
            console.log("error deleting dislikes")
          }

          if (doc.data()?.replies) {
            const replies = doc.data()!.replies;
            console.log(replies)
            replies.forEach((rid) => {
              this.afs.collection("replies").doc(rid).delete();
            })
          }
          else {
            console.log("error deleting replies")
          }

          this.afs.collection("posts").doc(docID).delete();
          this.afs.collection("profiles").doc(uid).update({ posts: arrayRemove(docID) });
        }

        else {
          console.log("error deleting post");
        }

      });
  }

  deleteProfile(uid: string) {

    this.afs.collection<Profile>("profiles").doc(uid)
      .get().subscribe((doc) => {
        const docID = doc.id;
        if (doc.exists) {

          if (doc.data()?.followers) {
            const followers = doc.data()!.followers;
            followers.forEach((uid) => {
              this.afs.collection("profiles").doc(uid).update({ following: arrayRemove(docID) });
            })
          }

          if (doc.data()?.following) {
            const following = doc.data()!.following;
            following.forEach((uid) => {
              this.afs.collection("profiles").doc(uid).update({ followers: arrayRemove(docID) });
            })
          }

          if (doc.data()?.posts) {
            const posts = doc.data()!.posts;
            posts.forEach((pid) => {
              this.deletePost(pid);
            })
          }

          this.afs.collection("bookmarks").ref.where('uid', '==', uid)
            .get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const docID = doc.id
                this.afs.collection("bookmarks").doc(docID).delete();
              });
            })

          this.afs.collection("users").doc(uid).delete()
          this.afs.collection("profiles").doc(uid).delete()
          
          if (this.authService.userData.uid == uid){
            //user deletion
            
          }
          else{
            //admin

          }
        }
        else {
          console.log("error deleting account")
        }
      });
    this.afs.collection("users").doc(uid).delete();
  }

  deleteReply(rid: string) {

    this.afs.collection<Reply>("replies").doc(rid)
      .get().subscribe((doc) => {
        const docID = doc.id;
        this.afs.collection("replies").doc(docID).delete()
      })
    }

  deleting() {
    switch (this.type) {
      case "post":
        this.deletePost(this.id)
        break;
      case "profile":
        this.deleteProfile(this.id)
        break;
      case "reply":
        this.deleteReply(this.id)
        break;
    }
    this.modalService.close();
  }
}
