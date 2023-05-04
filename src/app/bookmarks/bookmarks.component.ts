import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post } from '../shared/services/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})

export class BookmarksComponent implements OnInit, OnDestroy {
  bookmarks: any[] = [];
  posts: Post[] =[];
  noBookmarks: boolean = false;
  userSubscribe: Subscription | undefined;

  constructor(public authService: AuthService, public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.userSubscribe = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getBookmarks();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscribe?.unsubscribe();
  }

  getBookmarks(){
    this.afs.collection("bookmarks").ref.where("uid","==",this.authService.userData.uid).orderBy("date","desc").get().then((docs) => {
      if(docs.size > 0){
        docs.forEach((doc) => {
          let bookmark: any = doc.data();
          this.afs.collection("posts").doc(bookmark.pid).ref.get().then((post) => {
            this.posts.push(<Post>post.data());
          })
        })
      }
      else{
        this.noBookmarks = true;
      }
    })
  }
}
