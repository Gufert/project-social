import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Post }  from '../shared/services/post'
import { PostService } from '../shared/services/post.service';
import { User } from '../shared/services/user';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  
  constructor(
    public authService: AuthService,
    public postService: PostService
    ) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.post = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        content: '',
      };
    }

  count: Number = 0;
  remaining: number = 256;
  post: Post = new Post();
  submitted = false;
  user: User;

  ngOnInit(): void{
    this.transform();
    //this.builInitPost();
  }

  builInitPost(): void{
    //this.post.uid = this.user.uid;
    this.post = {
      uid: this.user.uid,
      displayName: this.user.displayName,
      photoURL: this.user.photoURL,
      content: '',
    };
    console.log(this.post)
  }

  makePost(): void {
    //let cont:String = document.getElementById(".content")?.innerText.valueOf as unknown as String;
    this.post =  {
      likes: 0,
      dislikes: 0,
      //content: cont,
      date: new Date(),
      ...this.post,
    }
    this.postService.submitPost(this.post).then(() => {
    console.log(this.post);
    console.log(this.post.content)
    console.log('Created new post successfully!');
    this.submitted = true;
    });
  }

  newPost(): void {
    this.submitted = false;
    this.post = new Post();
    };

  transform(){
    var bar = document.querySelector<HTMLElement>(".bar");
    if(bar){
      if(this.count <= 256){
        bar.style.transform = "rotate("+ (45+(Number(this.count)*0.7)) +"deg)"
      }
    }
  }

  charCount(){
    var text = Number(document.querySelector<HTMLElement>(".content")?.innerText.length);
    this.count = text;
    this.transform();

    this.remaining = 256 - Number(this.count);
    var progress = document.querySelector<HTMLElement>(".progress");
    if(progress){
      if(this.remaining < 0){
        progress.style.color = "red";
      }
      else{
        progress.style.color = "";
      }
    }
  }
}