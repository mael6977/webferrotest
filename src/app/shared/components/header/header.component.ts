import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLogout: Boolean = false;
  authToken$: Observable<string | null>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authToken$ = this.store.select(state => state.auth.token);
  }

  ngOnInit(): void {
    this.authToken$.subscribe(token => {
      this.showLogout = !!token;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToAnotherPage() {
    this.router.navigate(['/']);
  }
}
