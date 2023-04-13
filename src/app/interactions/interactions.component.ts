import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css']
})
export class InteractionsComponent implements OnInit {
  @Input() interation: String = "";
  
  ngOnInit(): void {
    
  }
}
