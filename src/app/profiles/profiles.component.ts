import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../profile.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  constructor(public authService: AuthService, public profileService: ProfileService, public modalService: ModalService) {}
  profile: any = this.profileService.profile;
  ngOnInit(): void {}
}
