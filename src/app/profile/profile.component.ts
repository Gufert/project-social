import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserData } from '../shared/services/user-data';
import { GetUserService } from '../shared/services/get-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userPath: String = '';
  user: UserData = {} as UserData;

  constructor(private activatedRoute: ActivatedRoute, public db: AngularFireDatabase, public profileService: ProfileService){
    activatedRoute.params.subscribe(params => {
      this.userPath = params['user']
    })
    //this.profileService.getProfile(this.user);
    this.profileService.noUser = false;
    this.profileService.user = {} as UserData;
    this.profileService.getProfile(this.userPath);
  } 

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.profileService.noUser = false;
    this.profileService.user = {} as UserData;
  }
}
