import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public db: AngularFireDatabase, public afs: AngularFirestore, private getUserService: GetUserService) { }

  searchText: string = "";
  results: any[] = [];
  res: any;
  user: UserData = {} as UserData

  search(){
    var query = this.searchText.replace(/\W/g, '').toLocaleLowerCase()
    this.results = [];

    if(query){
      this.afs.collection("users",ref=>ref.where('lowerDN', '>=', query)
      .where('lowerDN', '<=', query+ '~'))
      .get()
      .subscribe(data => data.forEach(async (el) => {
          this.res = el.data();
          this.user = await this.getUserService.UserFromUID(this.res.uid);
          this.results.push(this.user);
      }));
    }
  }
}
