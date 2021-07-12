import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UiService) { 

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

  }

  onSubmit() {

    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if(this.loadingSubs) {

      this.loadingSubs.unsubscribe();
    }

  }

  get emailRequired(): boolean | undefined {
    return this.form.get('email')?.hasError('required') && this.form.get('email')?.touched;
  }

  get isEmail(): boolean | undefined {
    return this.form.get('email')?.hasError('pattern') && this.form.get('email')?.touched;
  }

  get passwordRequired(): boolean | undefined {
    return this.form.get('password')?.hasError('required') && this.form.get('password')?.touched;
  }

  get passwordLength(): boolean | undefined {
    return this.form.get('password')?.hasError('minlength') && this.form.get('password')?.touched;
  }
}
