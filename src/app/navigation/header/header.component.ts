import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSuscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authSuscription = this.authService.authChange.subscribe(authStatus => {

        this.isAuth = authStatus;

    });

  }

  onToggleSidenav() {

    this.sidenavToggle.emit();


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.authSuscription.unsubscribe();
    
  }

  onLogout() {
    this.authService.logout();
  }

}
