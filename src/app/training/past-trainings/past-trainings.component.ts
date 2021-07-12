import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  private exChangedSubscription!: Subscription;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService) { }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {

      this.dataSource.data = exercises;

    })
    this.trainingService.fecthCompletedOrCancelledExercises();

  }

  doFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if(this.exChangedSubscription) {

      this.exChangedSubscription.unsubscribe();

    }

    


  }

}
