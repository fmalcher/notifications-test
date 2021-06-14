import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as BookActions from './book.actions';
import { NotificationService } from 'src/app/notification.service';


@Injectable()
export class BookEffects {


  notificationOnError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.errorAction),
      tap(() => this.ns.notify('error', 'Ein Fehler', 'books'))
    )
  }, { dispatch: false });

  notificationOnGlobalError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.globalErrorAction),
      tap(() => this.ns.notify('error', 'Globaler Fehler'))
    )
  }, { dispatch: false });

  notificationOnSuccessError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.successAction),
      tap(() => this.ns.notify('error', 'Erfolg!', 'books'))
    )
  }, { dispatch: false });


  constructor(private actions$: Actions, private ns: NotificationService) {}

}
