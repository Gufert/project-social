import { Component, OnInit } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(protected modalService: ModalService) { }
}

