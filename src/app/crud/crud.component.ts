import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {

  constructor(public authService: AuthService, public modalService: ModalService) {}
  uid = this.authService.userData.uid
}
