import { Injectable } from '@angular/core';
import { LikeDislike } from './like-dislike'
import { getDatabase} from "firebase/database";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {
  public dbLikePath = '/like';
  public dbDislikePate = '/dislike';
  postsLikeRef: AngularFirestoreCollection<LikeDislike>;
  postDislikeRef: AngularFirestoreCollection<LikeDislike>;

  constructor(public afs: AngularFirestore) {
    this.postsLikeRef = afs.collection(this.dbLikePath);
    this.postDislikeRef = afs.collection(this.dbDislikePate);
  }

  likePost(ld: LikeDislike): any{
    return this.afs.collection(this.dbLikePath).add({
      ...ld
    })
  }

  dislikePost(ld: LikeDislike): any{
    return this.afs.collection(this.dbDislikePate).add({
      ...ld
    })
  }
}
