import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { PredialService } from 'src/app/views/predial/services/predial.service';
import * as PredialActions from '../actions'
import { Injectable, inject } from '@angular/core';


@Injectable()
export class Predialffects {
  listPredial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PredialActions.predialListActions),
      mergeMap((action) =>
        this._servicePredial.searchPredialsByParams(action).pipe(
          map(listPredial => ({ type: '[Predial-PredialListSuccess] Listado de Predios obtenidos', listPredial})),
          catchError(error => of({type: '[Predial-PredialListError] Error al obterner listado de Predios', error}))
        )
      )
  ))

  listPredialSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PredialActions.predialListSuccessActions),
      map((value) => value)
    ), {dispatch: false}
  )

  listPredialError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PredialActions.predialListErrorActions),
      map((error) => {return error})
    ),{dispatch: false}
  )

  infoPredial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PredialActions.prediaInfoActions),
      map(info => PredialActions.prediaInfoSuccessActions(info)),
      catchError(error => of({type: '[Predial-PRedialInfoError] Error Información predio', error}))
    )
  )

  infoPredialSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PredialActions.prediaInfoSuccessActions),
      map((info) => info)
    ), {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private _servicePredial: PredialService
  ) {}
}
