import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor() { }

  follow(){
    console.log("follow called");
  }
}
