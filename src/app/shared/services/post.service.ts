import { Injectable } from '@angular/core';
import { Post } from '../services/post'
import { getDatabase} from "firebase/database";
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
  }

  getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

/*   getURL(){
    return
  }
 */
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
      ...post
    })
  }
}
