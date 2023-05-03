import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../shared/services/user-data';
import { GetUserService } from '../shared/services/get-user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userData: UserData = {} as UserData;
  expand: boolean = false;

  @Input() user: any;

  constructor(public getUserService: GetUserService, public afs: AngularFirestore, public modalService: ModalService){}

  async ngOnInit() {
    
  }

  reset(){
    this.userData.profileName = this.userData.displayName;
    this.userData.bio = "";
    this.userData.location = "";
    this.userData.link = "";
    this.userData.bannerURL = "";

    this.afs.collection("profiles").doc(this.userData.uid).update({
      profileName: this.userData.displayName,
      bio: "",
      location: "",
      link: "",
      bannerURL: ""
    })

    this.userData.photoURL = "https://firebasestorage.googleapis.com/v0/b/project-social-923a2.appspot.com/o/profile-pictures%2Fdefault-pfp.jpg?alt=media&token=008d33ee-4bb3-4b01-b227-c8d1eee67d6d";
    this.afs.collection("users").doc(this.userData.uid).update({
      photoURL: this.userData.photoURL
    })
  }

  async show(){
    if(!this.userData.uid){
      this.userData = await this.getUserService.UserFromUID(this.user.uid);
    }
    this.expand = !this.expand;
  }
}
