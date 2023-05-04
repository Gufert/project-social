import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { deleteDoc } from 'firebase/firestore';
import { LikeDislikeService } from './like-dislike.service';
import { arrayRemove } from 'firebase/firestore';
import { Like } from './like';
import { Dislike } from './dislike';
import { Post } from './post';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  likeObj: Like = new Like();
  dislikeObj: Dislike = new Dislike();


  constructor(public authService: AuthService, public afs: AngularFirestore, public likeDislikeService: LikeDislikeService) { }

  async checkIfLDExists(path: string, pid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afs.collection(path, ref =>
        ref.where('uid', '==', this.authService.userData.uid)
          .where('pid', '==', pid))
        .get()
        .subscribe((querySnapshot) => {
          resolve(!querySnapshot.empty);
        }, (error) => {
          reject(error);
        });
    });
  }

  async like(pid: string) {
    let val = 0;
    await this.checkIfLDExists("likes", pid).then(async (exists) => {
      if (exists) {
        this.afs.collection("likes").ref.where('uid', '==', this.authService.userData.uid)
          .where('pid', '==', pid)
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const docID = doc.id
              this.afs.collection("posts").doc(pid).update({ likes: arrayRemove(docID) })
              this.afs.collection("likes").doc(docID).delete();
            });
          })
          .catch((error) => {
          });
          val = -1;
      }
      else {
        this.likeObj = {
          uid: this.authService.userData.uid,
          pid: pid,
          date: new Date()
        }
        this.likeDislikeService.likePost(this.likeObj);
        val = 1;
      }
    })
    return val;
  }

  async dislike(pid: string) {
    let val = 0
    await this.checkIfLDExists("dislikes", pid).then(async (exists) => {
      if (exists) {
        await this.afs.collection("dislikes").ref.where('uid', '==', this.authService.userData.uid)
          .where('pid', '==', pid)
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const docID = doc.id
              this.afs.collection("posts").doc(pid).update({ dislikes: arrayRemove(docID) })
              this.afs.collection("dislikes").doc(docID).delete();
            });
          })
          .catch((error) => {
            
          });
        val = -1;
      }
      else {
        this.dislikeObj = {
          uid: this.authService.userData.uid,
          pid: pid,
          date: new Date()
        }
        this.likeDislikeService.dislikePost(this.dislikeObj)
        val = 1;
      }
    })
    return val;
  }

  async bookmark(pid: string) {
    this.afs.collection("bookmarks", ref => ref.where("uid", "==", this.authService.userData.uid).where("pid", "==", pid)).get()
      .subscribe((data) => {
        if (data.size > 0) {
          data.forEach((doc) => {
            var docData: any = doc.data();
            this.afs.collection("bookmarks").doc(docData.bid).delete();
          })
          return false;
        }
        else {
          return this.afs.collection("bookmarks").add({
            date: new Date(),
            uid: this.authService.userData.uid,
            pid: pid
          }).then((docRef) => {
            let newDocID = docRef.id
            docRef.set({
              bid: newDocID
            },
              { merge: true });
          }).catch((error) => {
            console.error("Error", error)
          })
        }
      });
  }

  share(pid: string) {
    navigator.clipboard.writeText(window.location.origin + "/post/" + pid);
  }
}