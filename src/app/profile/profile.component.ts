import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userPath: String = '';

  constructor(private activatedRoute: ActivatedRoute, public profileService: ProfileService, public router: Router, public title: Title){} 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(this.userPath != params['user']){
        this.userPath = params['user']
        this.title.setTitle("Project Social | @" + this.userPath);
        this.profileService.getProfile(this.userPath);
      }
    })
  }
  ngOnDestroy(): void {
    this.profileService.noUser = false;
    this.profileService.user = {} as UserData;
  }
}
