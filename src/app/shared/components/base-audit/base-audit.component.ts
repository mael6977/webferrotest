import {
  Component,
  ViewChild,
  ViewContainerRef,
  OnInit,
  EnvironmentInjector,
  Type,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  GenericRequest,
  GenericResponse,
} from '../../../core/interface/generic.interface';
import { componentClasses, steps } from './base-audti.config';
import { AppState } from '../../../store/app.state';
import { addQuestion } from '../../../store/actions/survey.actions';
import { Question } from '../../../store/reducers/survey.reducer';
import { Observable, firstValueFrom, map } from 'rxjs';
import { AuditService } from '../../../core/services/audit.service';

@Component({
  selector: 'app-base-audit',
  standalone: true,
  imports: [CommonModule],
  providers: [AuditService],
  templateUrl: './base-audit.component.html',
  styleUrls: ['./base-audit.component.scss'],
})

export class BaseAuditComponent implements OnInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  public nextStepId: number | undefined = 0;
  public currentStepId: number | undefined = 0;
  public previousStepId: number | undefined = -1;
  private countFridge: number = 0;
  private readonly steps = steps;
  private readonly componentClasses = componentClasses;
  private receivedQuestion!: Question;
  private hasNewQuestion!: boolean;
  public showButton: number = 0;


  survey$: Observable<Question[] | null> = this.store.select(
    (state) => state.survey.survey
  );
  constructor(
    private injector: EnvironmentInjector,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private auditService: AuditService
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  public nextStep() {
    if (this.hasNewQuestion) {
      this.receivedQuestion.id = this.validId();
      this.store.dispatch(addQuestion({ question: this.receivedQuestion }));
      this.hasNewQuestion = false;
      if (this.receivedQuestion.id == "1" && this.receivedQuestion.answer == "NO" || this.receivedQuestion.id == "2" && this.receivedQuestion.answer == "NO" || this.receivedQuestion.id == "8") {
        this.auditService.postAudit().subscribe(
          response => {
            console.log('Audit created successfully', response);
          },
          error => {
            console.error('Error creating audit', error);
          }
        );
      }
    }
    this.loadComponent();
  }

  public prevStep() {
    if (this.previousStepId !== undefined && this.previousStepId >= 0) {
      this.nextStepId = this.previousStepId;
      this.loadComponent();
    }
  }

  private validId(): string | undefined {
    let newId = this.receivedQuestion.id;
    if ([7, 8, 9].includes(this.currentStepId!)) {
      newId = newId! + '.' + this.countFridge;
      console.log('new id', newId);
      console.log('current step', this.currentStepId);
    }
    return newId;
  }

  private clearDynamicContainer() {
    this.dynamicContainer.clear();
  }

  private async getNextStep() {
    if (this.currentStepId === 9 && this.countFridge < 2) {
      const searchQuestion = () =>
        this.survey$.pipe(
          map((questions) => questions?.filter((item) => item.id === '4'))
        );
      const items = await firstValueFrom(searchQuestion());
      if (items && items.length > 0 && items[0].answer === '2') {
        return this.steps.find((step) => step.id === 7);
      }
    }
    return this.steps.find((step) => step.id === this.nextStepId);
  }

  private createDynamicComponent(component: Type<any>, data: GenericRequest) {
    this.clearDynamicContainer();
    const componentRef = this.dynamicContainer.createComponent(component, {
      environmentInjector: this.injector,
    });
    if (componentRef) {
      (componentRef.instance as any).dataRequest = data;
      this.cdr.detectChanges();
    }
    return componentRef;
  }

  private subscribeToComponentEvents(ref: any) {
    if (
      this.componentClasses.some(
        (component) => ref.instance instanceof component
      )
    ) {
      ref.instance.optionsSelected.subscribe(
        (selectedOption: GenericResponse) => {
          if (selectedOption.selectOption === '5') {
            this.addFridge();
          }
          if (selectedOption.Question?.id) {
            this.hasNewQuestion = true;
            this.receivedQuestion = selectedOption.Question;
          }
          this.nextStepId = selectedOption.selectStep;
          if (
            selectedOption.prevStep !== undefined &&
            selectedOption.prevStep >= 0
          ) {
            this.previousStepId = selectedOption.prevStep;
          }
        }
      );
    }
  }

  private addFridge(): void {
    this.countFridge = this.countFridge + 1;
  }

  private loadComponent() {
    this.clearDynamicContainer();
    this.getNextStep().then((step) => {
      if (!step) {
        return;
      }
      this.currentStepId = step.id;
      this.previousStepId = step.data.prevStep;
      const ref = this.createDynamicComponent(step.component, step.data);
      this.subscribeToComponentEvents(ref);
    });
  }
}
