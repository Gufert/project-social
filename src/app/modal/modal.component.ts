import { Component } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    constructor(protected modalService: ModalService) { }

    close() {
        this.modalService.comp = "";
        
        var modal = document.querySelector<HTMLElement>(".modal");
        var backdrop = document.querySelector<HTMLElement>(".modal-backdrop");
        var main = document.querySelector<HTMLElement>(".main");

        if(modal && backdrop && main){
            modal.style.display = "";
            backdrop.style.display = "";
            main.style.pointerEvents = "auto";
        }
    }
}
