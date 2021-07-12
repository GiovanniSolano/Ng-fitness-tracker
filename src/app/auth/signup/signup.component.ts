import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  maxDate: Date | undefined;
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear());

  }

  onSubmit(form: NgForm) {

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    }); 
    

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if(this.loadingSubs) {
          this.loadingSubs.unsubscribe();

    }

  }

}
