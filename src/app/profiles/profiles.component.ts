import { Component } from '@angular/core';

import Profile from '../../testing/testprofile.json';

interface Profile {
  name: String;
  username: String;
  pfp: String;
  background: String;
  bio: String;
  location: String,
  link: String,
  joinDate: String,
  followingCount: Number,
  followerCount: Number
}
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  profile: Profile = Profile;
}
