import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  public showPassword: boolean = false;
  public showEmailError: boolean = false;
  public showPasswordError: boolean = false;
  public showGeneralError: boolean = false;
  public signInForm: FormGroup;

  userRole$: Observable<string | null>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.userRole$ = this.store.select(state => state.auth.role);
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => {
      if (role === 'Admin') {
        this.router.navigate(['/report']);
      } else if (role === 'User') {
        this.router.navigate(['/audit']);
      } else if (role) {
        this.showGeneralError = true;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.dispatchLogin(email, password);
    } else {
      this.showGeneralError = true;
    }
  }
}
