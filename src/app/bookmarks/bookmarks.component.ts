import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post } from '../shared/services/post';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})

export class BookmarksComponent {
  bookmarks: any[] = [];
  posts: Post[] =[];

  constructor(public authService: AuthService, public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getBookmarks();
      }
    });
  }

  getBookmarks(){
    this.afs.collection("bookmarks",ref=>ref.where("uid", "==", this.authService.userData.uid).orderBy("date","desc")).get()
    .subscribe((data) => {
      data.forEach((el) => {
        this.bookmarks.push(el.data());
      })
      this.bookmarks.forEach((bookmark) => {
        this.afs.collection("posts").doc(bookmark.pid).ref.get().then((doc) => {
          this.posts.push(<Post>doc.data());
        })
      })
    });
    
  }
}
