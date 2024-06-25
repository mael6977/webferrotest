import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuditService } from "../../core/services/audit.service";
import { Injectable } from "@angular/core";
import { resetComment, sendAudit } from "../actions/survey.actions";
import { resetBusiness } from "../actions/business.actions";
import { map, mergeMap, tap } from "rxjs";

@Injectable()
export class ResourceEffects {
    constructor(
        private actions$: Actions,
        private auditService: AuditService
      ) {}

sendAudit$=createEffect(()=>
    this.actions$.pipe(
        ofType(sendAudit),
        mergeMap(()=>
          this.auditService.postAudit().pipe(
            mergeMap(() =>  [resetComment(), resetBusiness()] )
          )
        )
    )
);
}

