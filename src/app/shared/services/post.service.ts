import { Injectable, OnInit } from '@angular/core';
import { Post } from '../services/post'
import { getDatabase} from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AuthService } from './auth.service';
import { arrayUnion } from 'firebase/firestore';
import { ModalService } from './modal.service';
import { GetUserService } from './get-user.service';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class PostService{
  public dbPath = '/posts';
  arrayOfPosts: any[] = []
  postsRef: AngularFirestoreCollection<Post>;
  post: Post = <Post>{};
  user: UserData = <UserData>{};
  noFeed: boolean = false;
  noFollowing: boolean = false;
  
  constructor(public afs: AngularFirestore, public authService: AuthService, public modalService: ModalService, public getUserService: GetUserService){ 
    this.postsRef = afs.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  async getPosts(){
    this.afs
    .collection(this.dbPath)
    .get()
    .subscribe((snapShot) => {
      snapShot.docs.forEach((doc) => {
        this.arrayOfPosts.push(doc.data());
      });
    });
  }

  async getFeed(){
    this.noFeed = false;
    this.noFollowing = false;
    this.user = await this.getUserService.UserFromUID(this.authService.userData.uid);
    if (this.user.following.length > 0){
      this.afs.collection("posts",ref=>ref.where("uid", "in", this.user.following.splice(0, 10)).orderBy("date","desc")).get()
      .subscribe((data) => {
        if (data.size > 0) {
          data.forEach(async (el) => {
            this.arrayOfPosts.push(el.data());
          })
        }
        else{
          this.noFeed = true;
        }
      });
    }
    else{
      this.noFollowing = true;
    }
  }

  async getUserPosts(){
    
  }

  async makePost(content: string){
    this.post = {
      pid: "",
      uid: this.authService.userData.uid,
      date: new Date,
      content: content,
      likes: [],
      dislikes: [],
      replies: []
    };
    return this.afs.collection<Post>(this.dbPath).add({
      ...this.post
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        pid: newDocID,
        uid: this.authService.userData.uid,
        content: content},
        {merge: true});
      this.afs.collection("profiles").doc(this.authService.userData.uid).update({posts: arrayUnion(docRef.id)});
      this.modalService.close();
    }).catch((error) =>{
      console.error("Error", error)
    })
  }
}
