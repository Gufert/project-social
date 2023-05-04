import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { Profile } from '../services/profile';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { updateProfile, updateEmail, updatePassword,reauthenticateWithCredential} from 'firebase/auth'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastr: ToastrService,
    public modalService: ModalService,
    private db: AngularFireDatabase,
    
    
  ) {
    /* When logged in, localstorage is used to save user data, and when logged out, null is set up. */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.SetUserData(result.user);
        });
        this.SetUserData(result.user);
        this.modalService.close();
        this.router.navigate(['feed']);
        this.toastr.success('Login Successful');
      })
      .catch((error) => {
        this.toastr.error('Incorrect password or email')
      });
  }
  // Sign up with email/password
  async SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* After a new user signs up, call the SendVerificaitonMail() function and get a promise */
        /*this.SendVerificationMail();*/
        if (result.user) {
          // const toLow = username.toLocaleUpperCase();
          // result.user.lowerDN = toLow;
          result.user.updateProfile({
            displayName: username,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/project-social-923a2.appspot.com/o/profile-pictures%2Fdefault-pfp.jpg?alt=media&token=008d33ee-4bb3-4b01-b227-c8d1eee67d6d" //sets as default pfp on creation
          }).then(() => {
            this.SetUserProfile(result.user)
              .then(() => {
                this.modalService.close();
                this.SignIn(email, password);
                this.toastr.success('Sign Up Successful');
              })
          })
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //Update user's current username
  UpdateUserName(displayName: string, password:string) {
    return this.afAuth
      .onAuthStateChanged( (CurrentUser) => {
        if (CurrentUser) {
          const credential = auth.EmailAuthProvider.credential(this.userData.email, password);

    reauthenticateWithCredential(this.userData, credential).then(() => {
      //code goes here
      updateProfile(this.userData,{
        displayName: displayName,
        
      }).then( () => {
        //Profile Updated
        //new display name
        this.toastr.success('User Name Updated Successfully')
        this.modalService.close();
        this.SetUserData(this.userData)
        //this.userData.displayName= displayName
        displayName = displayName

      }
      
      ).catch((error) => {
        window.alert(error.message);
      });
    }).catch((error) => {
      //toastr error goes here
      this.toastr.error('Please Enter your Current password')
      
    });
          
        }
      });
  }
  //Update user's current Photo
  //TODO: Upload Photp automatically to firestore
  UpdatePFP(photoURL: string) {
    return this.afAuth
      .onAuthStateChanged(function (user) {
        if (user) {
          user.updateProfile({
            photoURL: photoURL
          }).then(function () {
            //Profile Updated
            //new photo URL
            photoURL = photoURL
          }
          ).catch((error) => {
            window.alert(error.message);
          });
        }
      });
  }
  updateUserPassword(password: string) {
    this.userData.updatePassword(password).then(function() {
      console.log('succcess!')
    }).catch((error: { message: any; }) => {
      window.alert(error.message)
    });
  }
  
  //update email
  UpdateEmail(email: string, password:string) {
    const credential = auth.EmailAuthProvider.credential(this.userData.email, password);

    reauthenticateWithCredential(this.userData, credential).then(() => {
      //code goes here
      updateEmail(this.userData, email).then(() => {
        this.modalService.close();
        this.toastr.success('Email Updated Successfully');

      }).catch((error: {message:any;}) =>{
        window.alert(error.message)}
  );
    }).catch((error) => {
      //toastr error goes here
      this.toastr.error('Please Enter your Current password')
    });
       
    };
// update password 
UpdatePassword(password: string, newPassword:string){
  const credential = auth.EmailAuthProvider.credential(this.userData.email, password);

    reauthenticateWithCredential(this.userData, credential).then(() => {
      //code goes here
       updatePassword(this.userData, newPassword).then(() => {
  this.modalService.close();
  this.toastr.success('Password Updated Successfully');
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
    }).catch((error) => {
      //toastr error goes here
      this.toastr.error('Please Enter your Current password')
    });

  } 
  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // when the user is logged in and the email is confirmed, it returns true.
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null /* && user.emailVerified !== false */ ? true : false;
  }
  // Sign in with Google
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['feed']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data in the Firestore database using AngularFirestore and the AngularFirestoreDocument service for login with username and password, signup with username and password, and sign in using a social authentication provider. */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      lowerDN: user.displayName.toLocaleLowerCase()
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  SetUserProfile(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `profiles/${user.uid}`
    )
    const profileData: Profile = {
      profileName: user.displayName,
      joinDate: Date().toString(),
      bio: "",
      bannerURL: "",
      location: "",
      link: "",
      posts: [],
      followers: [],
      following: []
    }
    return userRef.set(profileData, {
      merge: true,
    });
  }
  // Sign out
  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([''])
        .then(() => {
          window.location.reload();
        });
    });
  }

  deleteAuthentication(){
    //this.userData.auth().currentUser.delete()
  }
}