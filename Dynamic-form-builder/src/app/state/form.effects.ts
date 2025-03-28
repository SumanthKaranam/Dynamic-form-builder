import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FormService } from 'src/app/service/form.service';
import { loadForms, loadFormsSuccess } from './form.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class FormEffects {
  constructor(private actions$: Actions, private formService: FormService) {}

  loadForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForms),
      mergeMap(() =>
        this.formService.loadForms().pipe(
          map((forms) => loadFormsSuccess({ forms }))
        )
      )
    )
  );
}