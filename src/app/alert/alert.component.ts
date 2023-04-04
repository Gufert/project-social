import { Component } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(public modalService: ModalService) {}
}
