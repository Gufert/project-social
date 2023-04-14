import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { GetUserService } from './get-user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  noUser: boolean = false;
  userData: any;
  profileData: any;
  user: UserData = {} as UserData;
  posts: Array<Post> = [];

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
            this.profileData.posts.forEach(async (element: any) => {
              await this.afs.collection("posts", ref=>ref.orderBy("date","desc")).doc(element).ref.get().then(async (doc) => {
                var post = <Post>doc.data();
                this.posts.push(post);
              })
              console.log(this.posts);
            })
          })
        }
        else{
          this.noUser = true;
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