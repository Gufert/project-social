import { Component } from '@angular/core';

import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  constructor(protected modalService: ModalService) { }
}
