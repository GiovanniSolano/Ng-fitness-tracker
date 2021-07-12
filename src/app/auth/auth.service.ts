
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User | null;
  private isAuthtenticated = false;

  authChange = new Subject<boolean>();

  constructor(private router: Router, 
    private afAuth: AngularFireAuth,
     private trainingService: TrainingService,
     private uiService: UiService) { }


  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);

        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
          .then(result => {
            this.uiService.loadingStateChanged.next(false);

          }).catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, undefined, 3000);
            
          });


    }

    initAuthListener() {

      this.afAuth.authState.subscribe(user => {

        if(user) {

          this.isAuthtenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);


        } else {

          this.trainingService.cancelSubscriptions();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthtenticated = false;



        }

      })

    }


  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {   
      this.uiService.loadingStateChanged.next(false);
   
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);

      this.uiService.showSnackbar(error.message, undefined, 3000);

      
    
    });


  }

  logout() {
    this.afAuth.signOut();
  }

  getUser() {
      return {...this.user};
  }

  isAuth() {
      return this.isAuthtenticated;
  }


}
