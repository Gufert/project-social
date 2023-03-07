import { Component, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
    constructor(protected modalService: ModalService) { }

    open() {
        console.log("yeah");
        var modal = document.querySelector<HTMLElement>(".modal");
        if(modal){
            modal.style.display = "block";
            var main = document.querySelector<HTMLElement>(".main");
            if(main){
                main.style.opacity = ".5";
                main.style.pointerEvents = "none";
            }
        }
    }

    close() {
        var modal = document.querySelector<HTMLElement>(".modal");
        if(modal){
            modal.style.display = "";
            var main = document.querySelector<HTMLElement>(".main");
            if(main){
                main.style.opacity = "1";
                main.style.pointerEvents = "auto";
            }
        }
    }
}
