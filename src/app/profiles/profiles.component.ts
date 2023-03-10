import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

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
export class ProfilesComponent implements OnInit {
  profile: Profile = Profile;
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}
}
