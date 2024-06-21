import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitStateComponent } from './init-state.component';

describe('InitStateComponent', () => {
  let component: InitStateComponent;
  let fixture: ComponentFixture<InitStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
