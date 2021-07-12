import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];
  exerciseSuscription: Subscription | undefined;
  isLoading = true;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.exerciseSuscription = this.trainingService.exercisesChanged.subscribe(
      exercisesBD => {
        this.exercises = exercisesBD;
        this.isLoading = false;
      }
    );

    this.fetchExercises();

  }

  onStartTraining(form: NgForm) {

    this.trainingService.startExercise(form.value.exercise);

  }

  fetchExercises() {

    this.trainingService.fecthAvailableExercises();




  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if(this.exerciseSuscription) {

      this.exerciseSuscription?.unsubscribe();
    }
    

  }

}
