import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    comp: String = '';

    open(id: string) {
        this.comp = id;

        var modal = document.querySelector<HTMLElement>(".modal");
        var backdrop = document.querySelector<HTMLElement>(".modal-backdrop");
        var main = document.querySelector<HTMLElement>(".main");

        if(modal && backdrop && main){
            modal.style.display = "block";
            backdrop.style.display = "block"
            main.style.pointerEvents = "none";
        }
    }
}
