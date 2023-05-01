import { Injectable } from '@angular/core';
import { Like } from './like'
import { Dislike } from './dislike';
import { getDatabase} from "firebase/database";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {
  public dbLikePath = '/likes';
  public dbDislikePate = '/dislikes';
  postsLikeRef: AngularFirestoreCollection<Like>;
  postDislikeRef: AngularFirestoreCollection<Dislike>;

  constructor(public afs: AngularFirestore) {
    this.postsLikeRef = afs.collection(this.dbLikePath);
    this.postDislikeRef = afs.collection(this.dbDislikePate);
  }

  likePost(ld: Like): any{
    return this.afs.collection(this.dbLikePath).add({
      ...ld
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        lid: newDocID},
        {merge: true});
      console.log("documanet id: ", docRef.id);
      this.afs.collection("posts").doc(ld.pid).update({likes: arrayUnion(newDocID)})
    }).catch((error) =>{
      console.error("Error", error)
    })
  }

  dislikePost(ld: Dislike): any{
    return this.afs.collection(this.dbDislikePate).add({
      ...ld
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        did: newDocID},
        {merge: true});
      console.log("documanet id: ", docRef.id);
      this.afs.collection("posts").doc(ld.pid).update({dislikes: arrayUnion(newDocID)})
    }).catch((error) =>{
      console.error("Error", error)
    })
  }
}
