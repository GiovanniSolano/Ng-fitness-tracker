import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {


  isAuth = false;
  authSuscription!: Subscription;


  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {


    this.authSuscription = this.authService.authChange.subscribe(authStatus => {

      this.isAuth = authStatus;

  });

  }


  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }


}
