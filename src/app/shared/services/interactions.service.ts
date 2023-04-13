import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor() { }

  like(){

  }

  dislike(){

  }

  bookmark(){

  }

  share(){
    navigator.clipboard.writeText(window.location.toString());
  }
}
