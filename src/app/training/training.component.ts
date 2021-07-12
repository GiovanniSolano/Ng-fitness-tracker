import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;
  exerciseSubscription: Subscription | undefined;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {

        if(exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      

    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }

  }

  

}
