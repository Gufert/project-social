import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    comp: String = '';
    show: Boolean = false;

    open(id: string) {
        this.comp = id;
        this.show = true;
    }

    close(){
        this.show = false
        this.comp = '';
    }
}
