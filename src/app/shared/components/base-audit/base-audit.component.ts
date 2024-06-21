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
  private readonly steps = steps;
  private readonly componentClasses = componentClasses;
  private receivedQuestion!: any;
  private hasNewQuestion!: boolean;

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
      this.store.dispatch(addQuestion({ question: this.receivedQuestion }));
      this.hasNewQuestion = false;
    }
    this.loadComponent();
  }

  public prevStep() {
    if (this.previousStepId !== undefined && this.previousStepId >= 0) {
      this.nextStepId = this.previousStepId;
      this.loadComponent();
    }
  }

  private clearDynamicContainer() {
    this.dynamicContainer.clear();
  }

  private async getNextStep() {
    if (this.currentStepId === 9) {
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
          console.log("selectedOption", selectedOption)
          if (selectedOption.Question?.id) {
            this.hasNewQuestion = true;
            this.receivedQuestion = selectedOption.Question;
            if (selectedOption.Question.id == "1" && selectedOption.Question.answer == "No" || selectedOption.Question.id == "2" && selectedOption.Question.answer == "No") {
              this.survey$.subscribe((state) => {
                console.log('Survey state:', state);
                const auditData = {
                  auditor: '60c72b2f5f1b2c6d88f72e56',
                  business: '60c72b2f5f1b2c6d88f72e57',
                  visit: 1,
                  answer0: "",
                  commentAnswer0: "",
                  answer1: "",
                  commentAnswer1: "",
                  answer2: "",
                  commentAnswer2: "",
                  answer3: "",
                  commentAnswer3: "",
                  answer4: "",
                  commentAnswer4: "",
                  answer5: "",
                  commentAnswer5: "",
                  answer6: "",
                  commentAnswer6: "",
                  answer7: "",
                  commentAnswer7: "",
                  answer8: "",
                  commentAnswer8: ""
                };
                this.auditService.postAudit(auditData).subscribe(
                  response => {
                    console.log('Audit created successfully', response);
                  },
                  error => {
                    console.error('Error creating audit', error);
                  }
                );
              });
            }
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
