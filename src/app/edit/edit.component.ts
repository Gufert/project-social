import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MediaComponent } from '../media/media.component';

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
  pfp: any;
  banner: any;
  
  pfpFile: any;
  bannerFile: any;

  constructor(public profileService: ProfileService, public afs: AngularFirestore, public authService: AuthService, 
              public modalService: ModalService, public storage: AngularFireStorage, public media: MediaComponent) {}

  async ngOnInit(): Promise<void> {
    this.user = this.profileService.user;
    this.profileName = this.user.profileName;
    this.bio = this.user.bio;
    this.location = this.user.location;
    this.link = this.user.link;
    this.pfp = this.user.photoURL;
    this.banner = this.user.bannerURL;
  }

  ngOnDestroy(): void {
    this.user = {} as UserData;
    this.profileName = "";
    this.bio = "";
    this.location = "";
    this.link = "";
  }

  upload(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if(files[0]){
      //this.media.open(files[0]);
      var reader = new FileReader();
		  reader.readAsDataURL(files[0]);

      reader.onload = (_event) => {
        if (type == 'pfp') {
          this.pfp = reader.result;
          this.pfpFile = files[0];
        }
        if (type == 'banner') {
          this.banner = reader.result;
          this.bannerFile = files[0];
        }
      }
    }
  }

  save(){
    if(this.pfp != this.user.photoURL && this.pfpFile){
      const path = 'profile-pictures/' + this.user.uid;
      const storageRef = this.storage.storage.ref(path);
      this.storage.upload(path,this.pfpFile).then(() => {
        storageRef.getDownloadURL().then((url) => {
          this.authService.UpdatePFP(url);
          this.afs.collection("users").doc(this.authService.userData.uid).update({
            photoURL: url
          })
          this.profileService.user.photoURL = url;
        });
      });
    }
    
    if(this.banner != this.user.bannerURL && this.bannerFile){
      const path = 'profile-banners/' + this.user.uid;
      const storageRef = this.storage.storage.ref(path);
      this.storage.upload(path,this.bannerFile).then(() => {
        storageRef.getDownloadURL().then((url) => {
          this.afs.collection("profiles").doc(this.authService.userData.uid).update({
            bannerURL: url
          })
          this.profileService.user.bannerURL = url;
        });
      });
    }

    if(this.profileName != this.user.profileName || this.bio != this.user.bio || this.location != this.user.location || this.link != this.user.link){
      this.afs.collection("profiles").doc(this.authService.userData.uid).update({
        profileName: this.profileName,
        bio: this.bio,
        location: this.location,
        link: this.link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
      })
      this.profileService.user.profileName = this.profileName;
      this.profileService.user.bio = this.bio;
      this.profileService.user.location = this.location;
      this.profileService.user.link = this.link;
    }
    
    //this.modalService.close()
  }
}
