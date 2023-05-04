import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from './shared/services/post';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Profile } from './shared/services/profile';

@Injectable({
  providedIn: 'root'
})
export class UnitTestService {
  unitUser = {displayName: "UnitTest", email: "unit@test.com", emailVerified: false, lowerDN: "unittest", photoURL: "", uid: "14"};

  constructor(private afs: AngularFirestore) {}

  async makeProfile(user: any){
    const profileRef: AngularFirestoreDocument<any> = this.afs.doc(
      `profiles/${user.uid}`
    )
    const profileData: Profile = {
      profileName: user.displayName,
      joinDate: Date().toString(),
      bio: "",
      bannerURL: "",
      location: "",
      link: "",
      posts: [],
      followers: [],
      following: []
    }
    return profileRef.set(profileData, {
      merge: true,
    });
    
  }

  async updateProfile(profileName: string, bio: string, location: string, link: string){
    await this.afs.collection("profiles").doc(this.unitUser.uid).update({
      profileName: profileName,
      bio: bio,
      location: location,
      link: link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    })
  }

  async isAdmin(){
    let docData: any;

    await this.afs.collection("roles").doc("admin").ref.get().then((doc) => {
       docData = doc.data();
    })

    return docData.admins.indexOf(this.unitUser.uid);
  }

  async isOwner(){
    let docData: any;

    await this.afs.collection("roles").doc("owner").ref.get().then((doc) => {
      docData = doc.data();
   })

   return docData.owners.indexOf(this.unitUser.uid);
  }

  async makePost(content: string){
    let pid: string = "";
    const post = {
      pid: "",
      uid: this.unitUser.uid,
      date: new Date,
      content: content,
      likes: [],
      dislikes: [],
      replies: []
    };
    await this.afs.collection<Post>("posts").add({
      ...post
    }).then(async (docRef) =>{
      let newDocID = docRef.id
      docRef.set({
        pid: newDocID},
        {merge: true});
      pid = docRef.id;
      await this.afs.collection("profiles").doc(this.unitUser.uid).update({posts: arrayUnion(docRef.id)});
    }).catch((error) =>{
      console.error("Error", error)
    })
    return pid;
  }

  async like(pid: string) {
    let lid: string = "";
    await this.afs.collection("likes").ref.where('uid', '==', this.unitUser.uid).where('pid', '==', pid).get().then(async (querySnapshot) => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(async (doc) => {
          var docData: any = doc.data();
          await this.afs.collection("posts").doc(pid).update({likes: arrayRemove(docData.lid)});
          await this.afs.collection("likes").doc(docData.lid).delete();
        })
      }
      else{
        await this.afs.collection("likes").add({
          date: new Date(),
          uid: this.unitUser.uid,
          pid: pid
        }).then(async (docRef) =>{
          lid = docRef.id;
          let newDocID = docRef.id
          docRef.set({
            lid: newDocID},
            {merge: true});
          await this.afs.collection("posts").doc(pid).update({likes: arrayUnion(newDocID)});
        }).catch((error) =>{
          console.error("Error", error)
        })
      }
    })
    return lid;
  }

  async dislike(pid: string) {
    let did: string = "";
    await this.afs.collection("dislikes").ref.where('uid', '==', this.unitUser.uid).where('pid', '==', pid).get().then(async (querySnapshot) => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(async (doc) => {
          var docData: any = doc.data();
          await this.afs.collection("posts").doc(pid).update({dislikes: arrayRemove(docData.did)});
          await this.afs.collection("dislikes").doc(docData.did).delete();
        })
      }
      else{
        await this.afs.collection("dislikes").add({
          date: new Date(),
          uid: this.unitUser.uid,
          pid: pid
        }).then(async (docRef) =>{
          did = docRef.id;
          let newDocID = docRef.id
          docRef.set({
            did: newDocID},
            {merge: true});
          await this.afs.collection("posts").doc(pid).update({dislikes: arrayUnion(newDocID)});
        }).catch((error) =>{
          console.error("Error", error)
        })
      }
    })
    return did;
  }

  async bookmark(pid: string){
    let bid: string = "";
    await this.afs.collection("bookmarks").ref.where('uid', '==', this.unitUser.uid).where('pid', '==', pid).get().then(async (querySnapshot) => {
      if(querySnapshot.size > 0){
        querySnapshot.forEach(async (doc) => {
          var docData: any = doc.data();
          await this.afs.collection("bookmarks").doc(docData.bid).delete();
        })
      }
      else{
        await this.afs.collection("bookmarks").add({
          date: new Date(),
          uid: this.unitUser.uid,
          pid: pid
        }).then(async (docRef) =>{
          bid = docRef.id;
          let newDocID = docRef.id
          await docRef.set({
            bid: newDocID},
            {merge: true});
        }).catch((error) =>{
          console.error("Error", error)
        })
      }
    })
    return bid;
  }

  async makeReply(content: string, pid: string){
    let rid: string = "";
    const reply = {
      rid: "",
      pid: pid,
      uid: this.unitUser.uid,
      date: new Date,
      content: content
    };
    await this.afs.collection("replies").add({
      ...reply
    }).then(async (docRef) =>{
      rid = docRef.id;
      let newDocID = docRef.id;
      docRef.set({
        rid: newDocID
      },
        {merge: true});
      await this.afs.collection("posts").doc(pid).update({replies: arrayUnion(docRef.id)});
    }).catch((error) =>{
      console.error("Error", error)
    })
    return rid;
  }
}
