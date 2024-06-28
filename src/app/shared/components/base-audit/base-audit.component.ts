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
import { AuditService } from '../../../core/services/audit.service';
import { sendAudit, updateCountFridge, updateManyAnswer, updateResultAudit } from '../../../store/actions/survey.actions';
import { Observable } from 'rxjs';

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
  public getStateVisit$?: Observable<any>;
  private getStateAnswerCountFridge$: Observable<string>;
  private getStateCountFridge$: Observable<number>;
  public showButton: Boolean = false;
  public selectOptions?: GenericResponse;
  private readonly steps = steps;
  private readonly componentClasses = componentClasses;
  private answerCountFridge: number = 1;
  private countFridge: number = 0;

  constructor(
    private injector: EnvironmentInjector,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {
    this.getStateVisit$ = this.store.select(state => state.business.audits?.length);
    this.getStateAnswerCountFridge$ = this.store.select(state => state.survey.questions.find(x => x.id === 8)?.answer!);
    this.getStateCountFridge$ = this.store.select(state => state.survey.countFridge);
  }

  ngOnInit() {
    this.loadComponent();
    this.getStateAnswerCountFridge$.subscribe(data => {
      this.answerCountFridge = Number(data);
    });
    this.getStateCountFridge$.subscribe(data => {
      this.countFridge = data;
    });

  }

  public nextStep() {
    const questions = [{
      id: this.selectOptions!.id,
      answer: this.selectOptions!.answer
    },
    {
      id: this.selectOptions!.idComment!,
      answer: this.selectOptions!.comment!
    }];
    this.sendToStorage(questions);
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
    if (this.currentStepId === 9 &&
      this.countFridge < this.answerCountFridge) {
      return this.steps.find((step) => step.id === 7);
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
          this.nextStepId = selectedOption.selectStep;
          if (selectedOption.prevStep !== undefined && selectedOption.prevStep >= 0) {
            this.previousStepId = selectedOption.prevStep;
          }
          this.selectOptions = selectedOption;
        }
      );
    }
  }

  private sendToStorage(questions: any) {
    this.store.dispatch(updateManyAnswer({ questions }))
  }

  private sendToStorageCountFridge() {
    this.countFridge = this.countFridge + 1;
    this.store.dispatch(updateCountFridge({ countFridge: this.countFridge }));
  }

  private sendToStorageResumen(){
    const comment = this.selectOptions?.comment === null || this.selectOptions?.comment === undefined ? "":this.selectOptions?.comment;
    this.store.dispatch(updateResultAudit({result:this.selectOptions?.answer!,resultComment:comment!}));
  }
  private sendToStorageResumenBySimpleSelection(){
    this.store.dispatch(updateResultAudit({result:this.selectOptions?.answer!, resultComment:this.selectOptions?.comment || ""}));
  }

  private loadComponent() {
    this.clearDynamicContainer();
    this.getNextStep().then((step) => {
      if (!step) {
        return;
      }
      this.currentStepId = step.id;
      this.previousStepId = step.data.prevStep;
      if (step.data.numberQuestion === '5') {
        this.sendToStorageCountFridge();
        if (this.countFridge===2){
          step.data.idQuestionStateOption1=13;
          step.data.idQuestionStateOption2=14;
        }else{
          step.data.idQuestionStateOption1=9;
          step.data.idQuestionStateOption2=10;
        }
      }

      if (['1','2'].includes(this.selectOptions?.selectOption!) && this.selectOptions?.answer! === 'NO'){
        this.sendToStorageResumen();
        this.store.dispatch(sendAudit());
      }

      if (this.selectOptions?.selectOption === "8"){
        this.sendToStorageResumenBySimpleSelection();
      }

      if((this.selectOptions?.selectOption! === '9' && this.selectOptions?.answer! === 'NO')){
        this.store.dispatch(sendAudit());
      }

      if((this.selectOptions?.selectOption! === '11')){
        this.store.dispatch(sendAudit());
      }

      const ref = this.createDynamicComponent(step.component, step.data);
      this.subscribeToComponentEvents(ref);
      this.getStateVisit$?.subscribe(data => {
        if (this.currentStepId == 1 && data >= 3) {
          this.showButton = true
        } else {
          this.showButton = false
        }
      })
    });
  }
}
