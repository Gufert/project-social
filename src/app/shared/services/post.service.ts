import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Post } from '../services/post'
import { getDatabase, ref, set } from "firebase/database";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public dbPath = '/posts';
  arrayOfPosts: any[] = []
  postsRef: AngularFirestoreCollection<Post>;
  
  constructor(public afs: AngularFirestore){ 
    this.postsRef = afs.collection(this.dbPath);
    const database = getDatabase();
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
  submitPost(post: Post): any{
    return this.afs.collection(this.dbPath).add({
      pid: String,
      uid: String,
      date: Date,
      name: String,
      username: String,
      pfp: String,
      content: String,
      likes: Number,
      dislikes: Number,
    })
  }
}
