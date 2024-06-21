import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuditComponent } from './base-audit.component';

describe('BaseAuditComponent', () => {
  let component: BaseAuditComponent;
  let fixture: ComponentFixture<BaseAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
