import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { GetUserService } from './get-user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { Post } from './post';
import { Reply } from './reply';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  noUser: boolean = false;
  userData: any;
  profileData: any;
  user: UserData = {} as UserData;
  posts: Array<Post> = [];
  replies: Array<Reply> = [];
  repliesData: any[] = [];
  message: string = "";

  constructor(public afs: AngularFirestore, public getUserService: GetUserService, public authService: AuthService) { }

  async getProfile(user: String){
    this.afs
      .collection("users",ref=>ref.where("lowerDN","==",user.toLocaleLowerCase()))
      .get()
      .subscribe(data => {
        data.forEach(el => this.userData = el.data());
        if(this.userData != null){
          this.afs.collection("profiles").doc(this.userData.uid).ref.get().then((doc) => {
            this.profileData = doc.data();
            this.user = {...this.userData, ...this.profileData};
            this.user.joinDate = new Date(this.user.joinDate.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long'}); //don't question this
            this.getPosts();
          })
        }
        else{
          this.noUser = true;
        }
    })
  }

  async getPosts(){
    if(this.user.uid != null){
      this.posts = [];
      this.replies = [];
      this.repliesData = [];
      this.message = "";

      switch (window.location.pathname.split('/')[3]){
        case undefined:
          this.afs.collection("posts").ref.where("uid", "==", this.user.uid).orderBy("date","desc").get().then((docs) => {
            if(docs.size > 0){
              docs.forEach((doc) => {
                this.posts.push(<Post>doc.data());
              })
            }
            else{
              this.message = this.user.displayName + " has not made any posts."
            }
          })
          break;
        case "replies":
          this.afs.collection("replies").ref.where("uid", "==", this.userData.uid).orderBy("date","desc").get().then((docs) => {
            if(docs.size > 0){
              docs.forEach((doc) => {
                let reply: any = doc.data()
                reply.date = new Date(reply.date.seconds * 1000).toLocaleString("en-US", { hour: '2-digit', minute: "numeric", year: 'numeric', month: 'short', day: 'numeric'});
                this.replies.push(<Reply>reply);
              })
              this.replies.forEach((reply) => {
                this.afs.collection("posts").doc(reply.pid).ref.get().then(async (doc) => {
                  var post: any = doc.data();
                  this.repliesData.push({reply, ...await this.getUserService.UserFromUID(post.uid)});
                })
              })
            }
            else{
              this.message = this.user.displayName + " has not made any replies.";
            }
          })
          break;
        case "likes":
          this.getLDPost("likes");
          break;
        case "dislikes":
          this.getLDPost("dislikes");
          break;
      }
    }
  }

  getLDPost(table: string){
    this.afs.collection(table).ref.where("uid", "==", this.user.uid).orderBy("date","desc").get().then((docs) => {
      if(docs.size > 0){
        docs.forEach((doc) => {
          let ld: any = doc.data();
          this.afs.collection("posts").doc(ld.pid).ref.get().then((doc) => {
            this.posts.push(<Post>doc.data());
          })
        })
      }
      else{
        this.message = this.user.displayName + " has not " + table.replace(/.$/,"d") + " any posts." //magic :)
      }
    })
  }

  follow(){
    this.afs.collection("profiles").doc(this.userData.uid).update({followers: arrayUnion(this.authService.userData.uid)});
    this.afs.collection("profiles").doc(this.authService.userData.uid).update({following: arrayUnion(this.userData.uid)});
    this.user.followers.push(this.authService.userData.uid); 
  }

  unfollow(){
    this.afs.collection("profiles").doc(this.userData.uid).update({followers: arrayRemove(this.authService.userData.uid)});
    this.afs.collection("profiles").doc(this.authService.userData.uid).update({following: arrayRemove(this.userData.uid)});
    this.user.followers.splice(this.user.followers.indexOf(this.authService.userData.uid), 1);
  }
}