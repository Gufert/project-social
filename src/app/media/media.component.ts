import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  show: boolean = false;
  preview: any;

  constructor(){}

  open(media: File) {
    console.log("called");
    this.show = true;
    console.log(media);
    console.log(this.show);
    this.preview = media;
  }

  close(){
    this.show = false
  }
}
