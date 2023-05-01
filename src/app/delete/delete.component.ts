import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { InteractionsService } from '../shared/services/interactions.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() pid = ""
  
  constructor(
    public authService: AuthService,
    public postService: PostService,
    public router: Router,
    public afs: AngularFirestore,
    public getUserService: GetUserService,
    public interactionsService: InteractionsService
  ) {

  }
  
  ngOnInit() {
    
  }
}
