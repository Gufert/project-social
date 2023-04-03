import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(public modalService: ModalService) {}
}
