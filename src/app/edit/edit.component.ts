import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/services/auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy{
  user: UserData = {} as UserData;
  profileName: string = "";
  bio: string = "";
  location: string = "";
  link: string = "";

  constructor(public profileService: ProfileService, public afs: AngularFirestore, public authService: AuthService, public modal: ModalComponent) {}

  async ngOnInit(): Promise<void> {
    this.user = this.profileService.user;
    this.profileName = this.user.profileName;
    this.bio = this.user.bio;
    this.location = this.user.location;
    this.link = this.user.link;
  }

  ngOnDestroy(): void {
    this.user = {} as UserData;
    this.profileName = "";
    this.bio = "";
    this.location = "";
    this.link = "";
  }

  save(){
    this.afs.collection("profiles").doc(this.authService.userData.uid).update({
      profileName: this.profileName,
      bio: this.bio,
      location: this.location,
      link: this.link
    }).then(() => {
      window.location.reload();
    })
    this.modal.close()
  }
}
