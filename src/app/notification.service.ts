import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NotificationService as KendoNotificationService, NotificationSettings } from "@progress/kendo-angular-notification";

export interface MyNotification {
  text: string;
  type: 'error' | 'success';
  scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications$ = new Subject<MyNotification>();
  private notificationHosts$ = new Subject<{ el: any, scope: string, kns: KendoNotificationService }>();

  constructor(private globalKns: KendoNotificationService) {
    this.notificationHosts$.pipe(
      mergeMap(host => this.getNotificationsForScope(host.scope).pipe(
        map((notification): { notification: NotificationSettings, kns: KendoNotificationService } => {
          // diese ganzen Optionen könnten auch über das hineingegebene Objekt konfigurierbar sein
          return {
            notification: {
              content: notification.text,
              hideAfter: 600,
              position: { horizontal: "center", vertical: "top" },
              animation: { type: "fade", duration: 400 },
              type: { style: notification.type, icon: true },
              appendTo: host.el
            },
            kns: host.kns
          }
        })
      ))
    ).subscribe(({ notification, kns }) => {
      kns.show(notification);
    });

    this.notificationHosts$.next({ scope: 'global', el: undefined, kns: this.globalKns });
  }

  notify(type: 'error' | 'success', text: string, scope = 'global') {
    this.notifications$.next({ type, text, scope });
  }

  private getNotificationsForScope(scope: string): Observable<MyNotification> {
    return this.notifications$.pipe(filter(n => n.scope === scope));
  }

  addNotificationHost(scope: string, el: any, kns: KendoNotificationService) {
    this.notificationHosts$.next({ scope, el, kns });
  }
}
