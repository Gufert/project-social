import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    comp: String = '';
    param: String = '';
    show: Boolean = false;

    open(id: string) {
        var split = id.split(":");
        this.comp = split[0];
        this.param = split[1];
        this.show = true;
    }

    close(){
        this.show = false
        this.comp = '';
    }
}
