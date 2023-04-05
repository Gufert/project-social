import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { UserData } from '../shared/services/user-data';

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

  constructor(public profileService: ProfileService) {}

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
    console.log(this.profileName, this.bio, this.location, this.link);
  }
}
