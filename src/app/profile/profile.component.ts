import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userPath: String = '';
  routerSubscribe: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, public profileService: ProfileService, public router: Router, public title: Title){} 

  ngOnInit(): void {
    this.profileService.posts = [];
    this.profileService.replies = [];
    this.profileService.repliesData = [];
    this.activatedRoute.params.subscribe(params => {
      if(this.userPath != params['user']){
        this.userPath = params['user']
        this.title.setTitle("Project Social | @" + this.userPath);
        this.profileService.posts = [];
        this.profileService.getProfile(this.userPath);
      }
    })
    this.routerSubscribe = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.profileService.user.uid != null){
        this.profileService.getPosts();
      }
    })
  }

  ngOnDestroy(): void {
    this.profileService.noUser = false;
    this.profileService.user = {} as UserData;
    this.profileService.posts = [];
    this.profileService.replies = [];
    this.profileService.repliesData = [];
    this.routerSubscribe?.unsubscribe();
  }

  navigate(path: String){
    this.router.navigate(["/", path]).then(()=>{
      this.profileService.getPosts();
    });
  }
}
