import { Injectable } from '@angular/core';
import { LikeDislike } from './like-dislike'
import { getDatabase} from "firebase/database";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {
  public dbLikePath = '/likes';
  public dbDislikePate = '/dislikes';
  postsLikeRef: AngularFirestoreCollection<LikeDislike>;
  postDislikeRef: AngularFirestoreCollection<LikeDislike>;

  constructor(public afs: AngularFirestore) {
    this.postsLikeRef = afs.collection(this.dbLikePath);
    this.postDislikeRef = afs.collection(this.dbDislikePate);
  }

  likePost(ld: LikeDislike): any{
    return this.afs.collection(this.dbLikePath).add({
      ...ld
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        ldid: newDocID},
        {merge: true});
      console.log("documanet id: ", docRef.id);
    }).catch((error) =>{
      console.error("Error", error)
    })
  }

  dislikePost(ld: LikeDislike): any{
    return this.afs.collection(this.dbDislikePate).add({
      ...ld
    }).then((docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        ldid: newDocID},
        {merge: true});
      console.log("documanet id: ", docRef.id);
    }).catch((error) =>{
      console.error("Error", error)
    })
  }
}
