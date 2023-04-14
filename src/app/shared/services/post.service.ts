import { Injectable } from '@angular/core';
import { Post } from '../services/post'
import { getDatabase} from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AuthService } from './auth.service';
import { arrayUnion } from 'firebase/firestore';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public dbPath = '/posts';
  arrayOfPosts: any[] = []
  postsRef: AngularFirestoreCollection<Post>;
  post: Post = <Post>{};
  
  constructor(public afs: AngularFirestore, public authService: AuthService, public modalService: ModalService){ 
    this.postsRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  getPosts(){
    this.afs
    .collection(this.dbPath)
    .get()
    .subscribe((snapShot) => {
      snapShot.docs.forEach((doc) => {
        this.arrayOfPosts.push(doc.data());
      });
    });
  }

  async makePost(content: String){
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
