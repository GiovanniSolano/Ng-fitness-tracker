import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {


  isAuth$: Observable<boolean>;


  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {


    this.isAuth$ = this.store.select(fromRoot.getIsAuth);


  }


  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }


}
