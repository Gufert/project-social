import { Component, Input } from '@angular/core';
import { MediaService } from '../shared/services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  constructor(public mediaService: MediaService){}
}
