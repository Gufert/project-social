import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  show: boolean = false;
  type: string = "";
  pfp: any;
  banner: any;
  
  pfpFile: any;
  bannerFile: any;

  constructor() { }

  open(type: string){
    this.type = type;
    this.show = true;
  }

  close(){
    this.show = false;
  }
}
