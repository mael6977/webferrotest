import { Routes } from '@angular/router';
import { LoginComponent } from './shared/pages/login/login.component';
import { AuditComponent } from './shared/pages/audit/audit.component';
import { ReportComponent } from './shared/pages/report/report.component';

export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'audit', component: AuditComponent },
  { path:'report', component: ReportComponent }
];
