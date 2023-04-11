import { Component, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  remaining: Number = 255;

  constructor(public authService: AuthService) {}

  charCount(){

  }

  reply(){

  }
}
