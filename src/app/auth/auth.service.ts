
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

import { Store } from "@ngrx/store";

import * as fromRoot from '../app.reducer';

import * as UI from '../shared/ui.actions';

import * as Auth from "./auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User | null;


  constructor(private router: Router, 
    private afAuth: AngularFireAuth,
     private trainingService: TrainingService,
     private uiService: UiService,
     private store: Store<fromRoot.State>) { }


  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
          .then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());


          }).catch(error => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, undefined, 3000);
            
          });


    }

    initAuthListener() {

      this.afAuth.authState.subscribe(user => {

        if(user) {

          
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/training']);


        } else {

          this.trainingService.cancelSubscriptions();
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.router.navigate(['/login']);


        }

      })

    }


  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {   
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());

   
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());

      this.uiService.showSnackbar(error.message, undefined, 3000);

      
    
    });


  }

  logout() {
    this.afAuth.signOut();
  }

  getUser() {
      return {...this.user};
  }



}
