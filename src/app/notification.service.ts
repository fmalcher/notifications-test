import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MyNotification {
  text: string;
  type: 'error' | 'success';
  scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications$ = new Subject<MyNotification>();

  constructor() {
    this._notifications$.subscribe(e => console.log('NOTIFY', e));
  }

  notify(type: 'error' | 'success', text: string, scope = 'global') {
    this._notifications$.next({ type, text, scope });
  }
}
