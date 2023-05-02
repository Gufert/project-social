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
        const docID = doc.id;
        if (doc.exists) {
          const uid = doc.data()!.uid;

          if (doc.data()?.likes) {
            const likes = doc.data()!.likes;
            console.log(likes)
            likes.forEach((lid) =>{
              this.afs.collection("likes").doc(lid).delete();
            })
          }
          else{
            console.log("error deleting likes")
          }

          if (doc.data()?.dislikes) {
            const dislikes = doc.data()!.dislikes;
            console.log(dislikes)
            dislikes.forEach((did) =>{
              this.afs.collection("dislikes").doc(did).delete();
            })
          }
          else{
            console.log("error deleting dislikes")
          }

          if (doc.data()?.replies) {
            const replies = doc.data()!.replies;
            console.log(replies)
            replies.forEach((rid) =>{
              this.afs.collection("replies").doc(rid).delete();
            })
          }
          else{
            console.log("error deleting replies")
          }

          this.afs.collection("posts").doc(docID).delete();
          this.afs.collection("profiles").doc(uid).update({ posts: arrayRemove(docID) });
        }

        else {
          console.log("error deleting post");
        }

      });
  }

  deleteProfile(uid: string) {

    this.afs.collection<Profile>("profiles").doc(uid)
      .get().subscribe((doc) => {
        const docID = doc.id;
        if (doc.exists) {

          if (doc.data()?.followers) {
            const followers = doc.data()!.followers;
            for (let uid in followers) {
              this.afs.collection("profiles").doc(uid).update({ following: arrayRemove(docID) });
            }
          }

          if (doc.data()?.following) {
            const following = doc.data()!.following;
            for (let uid in following) {
              this.afs.collection("profiles").doc(uid).update({ followers: arrayRemove(docID) });
            }
          }

          if (doc.data()?.posts) {
            const posts = doc.data()!.posts;
            for (let pid in posts) {
              this.deletePost(pid);
            }
          }

          this.afs.collection("users").doc(uid).delete()
          this.afs.collection("profiles").doc(uid).delete()
        }
        else {
          console.log("error deleting account")
        }
      });


    this.afs.collection("users").doc(uid).delete();
  }
}
