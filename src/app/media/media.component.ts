import { Component, Input } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  @Input() media: string = "";

  constructor(public modalService: ModalService){}
}
