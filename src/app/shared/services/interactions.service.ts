import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { deleteDoc } from 'firebase/firestore';
import { LikeDislikeService } from './like-dislike.service';
import { arrayRemove } from 'firebase/firestore';
import { Like } from './like';
import { Dislike } from './dislike';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  likeObj: Like = new Like();
  dislikeObj: Dislike = new Dislike();


  constructor(public authService: AuthService, public afs: AngularFirestore, public likeDislikeService: LikeDislikeService) { }

  checkIfLDExists(path: string, pid: string): Promise<boolean> {
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

  like(pid: string) {
    this.checkIfLDExists("likes", pid).then((exists) => {
      if (exists) {
        console.log("delete like")
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
            console.log('Error getting documents: ', error);
          });
      }
      else {
        console.log("new like")
        this.likeObj = {
          uid: this.authService.userData.uid,
          pid: pid,
          date: new Date()
        }
        this.likeDislikeService.likePost(this.likeObj)
      }
    })
  }

  dislike(pid: string) {
    this.checkIfLDExists("dislikes", pid).then((exists) => {
      if (exists) {
        console.log("delete dislike")
        this.afs.collection("dislikes").ref.where('uid', '==', this.authService.userData.uid)
          .where('pid', '==', pid)
          .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const docID = doc.id
              this.afs.collection("posts").doc(pid).update({ dislikes: arrayRemove(docID) })
              this.afs.collection("dislikes").doc(docID).delete();
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
      else {
        console.log("new dislike")
        this.dislikeObj = {
          uid: this.authService.userData.uid,
          pid: pid,
          date: new Date()
        }
        this.likeDislikeService.dislikePost(this.dislikeObj)
      }
    })
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

  deletePost(pid: string) {

    this.afs.collection<Post>("posts").doc(pid)
      .get().subscribe((doc) => {
          const docID = doc.id
          if (doc.exists){
          const uid = doc.data()!.uid

          if (doc.data()?.likes){
            const likes = doc.data()!.likes
            for (let lid in likes) {
              this.afs.collection("likes").doc(lid).delete()
            }
          }

          if (doc.data()?.dislikes){
            const dislikes = doc.data()!.dislikes
            for (let did in dislikes) {
              this.afs.collection("dislikes").doc(did).delete()
            }
          }
          if (doc.data()?.dislikes){
            const replies = doc.data()!.replies
            for (let rid in replies) {
              this.afs.collection("replies").doc(rid).delete()
            }
          }
          
          this.afs.collection("posts").doc(docID).delete();
          this.afs.collection("profiles").doc(uid).update({ posts: arrayRemove(docID) })
          }

          else{
            console.log("error deleting post")
          }

        });
  }

  deleteProfile(uid: string) {
    
    this.afs.collection("profiles").doc(uid)
      .get().subscribe((doc) => {
          const docID = doc.id
          if (doc.exists){
            
          }

          this.afs.collection("posts").doc(uid).update({ dislikes: arrayRemove(docID) })
          this.afs.collection("dislikes").doc(docID).delete();
        });
      

      this.afs.collection("users").doc(uid).delete();
  }
}
