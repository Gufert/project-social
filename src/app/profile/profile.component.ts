import { Component } from '@angular/core';
import Profile from '../../testing/profile.json';

interface Profile {
  name: String;
  username: String;
  pfp: String;
  bio: String;
  location: String,
  link: String,
  joinDate: String,
  followingCount: Number,
  followerCount: Number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: Profile = Profile;
}
