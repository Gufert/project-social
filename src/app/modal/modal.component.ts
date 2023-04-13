import { Component } from '@angular/core';

import { ModalService } from '../shared/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    constructor(protected modalService: ModalService) { }

    close() {
        this.modalService.comp = "";
        this.modalService.show = false;
    }
}
