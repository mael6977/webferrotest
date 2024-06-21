import { Component, OnInit } from '@angular/core';
import { BaseAuditComponent } from '../../components/base-audit/base-audit.component';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [BaseAuditComponent],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent implements OnInit {
  ngOnInit():void{}
}
