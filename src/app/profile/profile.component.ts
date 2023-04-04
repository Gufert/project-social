import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userPath: String = '';

  constructor(private activatedRoute: ActivatedRoute, public profileService: ProfileService){
    activatedRoute.params.subscribe(params => {
      this.userPath = params['user']
    })
    this.profileService.getProfile(this.userPath);
  } 

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.profileService.noUser = false;
    this.profileService.user = {} as UserData;
  }
}
