import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  user: String = '';

  constructor(private activatedRoute: ActivatedRoute, public db: AngularFireDatabase, public profileService: ProfileService){
    activatedRoute.params.subscribe(params => {
      this.user = params['user']
    })
    this.profileService.getProfile(this.user);
  } 

  ngOnDestroy(): void {
    this.profileService.userData = null;
    this.profileService.profileData = null;
    this.profileService.noProfile = false;
  }
}
