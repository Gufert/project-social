import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Post } from '../services/post'
import { getDatabase, ref, set } from "firebase/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";



@Injectable({
  providedIn: 'root'
})
export class PostService {
  public dbPath = '/posts';
  arrayOfPosts: any[] = []

  constructor(public firestore: AngularFirestore){ 
    const database = getDatabase();
  }

  getPosts(){
    this.firestore
    .collection(this.dbPath)
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.arrayOfPosts.push(doc.data());
      });
    });
  }
}
