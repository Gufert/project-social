import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  show: boolean = false;
  preview: any;

  @Input() media: any;

  constructor(){}

  ngOnInit(): void {
    this.media = "https://firebasestorage.googleapis.com/v0/b/project-social-923a2.appspot.com/o/" + this.media;
    console.log(this.media);
  }
}