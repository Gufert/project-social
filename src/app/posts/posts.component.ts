import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  
  @Input() post?: any;
  constructor(public router: Router) { }

  ngOnInit(): void {}
  
  openThread(){
    //this.router.navigate(['']);
  }

  postClick(event: any, click: String){
    event.stopPropagation();
    console.log(click);
  }
}
