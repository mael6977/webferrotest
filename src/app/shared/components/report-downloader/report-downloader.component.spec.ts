import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDownloaderComponent } from './report-downloader.component';

describe('ReportDownloaderComponent', () => {
  let component: ReportDownloaderComponent;
  let fixture: ComponentFixture<ReportDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDownloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
