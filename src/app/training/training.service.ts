import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import { Store } from '@ngrx/store';

import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

import * as fromTraining from './training.reducer';




@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSubs: Subscription[] = [];


  private runningExercise!: Exercise;

  constructor(private db: AngularFirestore,
     private uiService: UiService,
     private store: Store<fromTraining.State>) { }


  fecthAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());    
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {

        return docArray.map(doc => {

          return {

            id: doc.payload.doc.id,
            ...doc.payload.doc.data() as Exercise

          }

      });

      }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());  
        this. store.dispatch(new Training.SetAvailableTrainings(exercises));

        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
      }, () => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, plaease try again later', undefined, 3000);

      }));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise)
    .pipe(take(1))
      .subscribe(ex => {
        this.addDataTodatabse({...ex, date: new Date(), state: 'completed'});
      });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());





  }

  cancelExercise(progress: number) {

    this.store.select(fromTraining.getActiveExercise)
    .pipe(take(1))
    .subscribe(ex => {
      this.addDataTodatabse(
        {...ex, 
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),   
        date: new Date(),
        state: 'cancelled'
      });

      this.store.dispatch(new Training.StopTraining());
    });


  }



  startExercise(selectedId: string) {

    // this.db.doc('availableExercises/' + selectedId)
    //   .update({lastSelected: new Date()});

  
    // this.runningExercise = this.availableExercises.find(result => result.id === selectedId)!;
    // this.exerciseChanged.next({...this.runningExercise});


    this.store.dispatch(new Training.StartTraining(selectedId));

  }

  fecthCompletedOrCancelledExercises() {
    
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        

      }));


  }

  cancelSubscriptions() {

    this.fbSubs.forEach(sub => sub.unsubscribe());

  }

  private addDataTodatabse(exercise: Exercise) {

    this.db.collection('finishedExercises').add(exercise);



  }

}
