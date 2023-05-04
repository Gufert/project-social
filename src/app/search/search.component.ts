import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GetUserService } from '../shared/services/get-user.service';
import { UserData } from '../shared/services/user-data';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public afs: AngularFirestore, private getUserService: GetUserService) { }

  searchText: string = "";
  results: any[] = [];
  noResults: boolean = false;
  input: string = "";

  search(){
    this.input = this.searchText;
    var query = this.searchText.replace(/\W/g, '').toLocaleLowerCase()
    this.results = [];
    this.noResults = false;

    if(query){
      this.afs.collection("users").ref.where("lowerDN", ">=", query).where("lowerDN", "<=", query+ "~").get().then((docs) => {
        if(docs.size > 0){
          docs.forEach(async (doc) => {
            let res: any = doc.data()
            this.results.push(await this.getUserService.UserFromUID(res.uid));
          })
        }
        else{
          this.noResults = true;
        }
      })
    }
  }
}