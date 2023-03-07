import { Injectable } from '@angular/core';

import { ModalComponent } from './modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
    comp: String = '';

    open(id: string) {
        this.comp = id;
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
}
