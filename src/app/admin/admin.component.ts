import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalService } from '../shared/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  userSubscribe: Subscription | undefined;
  filterText: string = "";
  users: any[] = [];
  allUsers: any[] = [];

  constructor(public adminService: AdminService, public authService: AuthService, public afAuth: AngularFireAuth, public afs: AngularFirestore, public modalService: ModalService) {}

  ngOnInit(): void {
    this.userSubscribe = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.afs.collection("users").ref.orderBy("lowerDN","asc").get().then((docs) => {
          docs.forEach((doc) => {
            this.users.push(doc.data());
          })
          this.allUsers = this.users;
        });
      }
    });
  }

  filter(filter: string){
    this.reset();
    filter = filter.toLocaleLowerCase();
    this.users = this.users.filter(function(user){
      return user.lowerDN >= filter && user.lowerDN <= filter+'~';
    });
  }

  reset(){
    this.users = this.allUsers;
  }

  ngOnDestroy(): void {
    this.userSubscribe?.unsubscribe();
  }
}