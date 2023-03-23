import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public db: AngularFireDatabase, public afs: AngularFirestore) { }

  searchText: string = "";
  results: any[] = [];

  search(){
    var query = this.searchText.replace(/\W/g, '').toLocaleLowerCase()
    this.results = [];

    if(query){
      this.afs.collection("users",ref=>ref.where('lowerDN', '>=', query)
      .where('lowerDN', '<=', query+ '~'))
      .get()
      .subscribe(data => data.forEach(el => this.results.push(el.data())));
      console.log(this.results);
    }
  }
}
