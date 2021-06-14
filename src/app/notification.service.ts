import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NotificationService as KendoNotificationService, NotificationSettings } from "@progress/kendo-angular-notification";

export interface MyNotification {
  text: string;
  type: 'error' | 'success';
  scope: string;
}

export interface NotificationHost {
  container?: ViewContainerRef,
  scope: string,
  kns: KendoNotificationService
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications$ = new Subject<MyNotification>();
  private notificationHosts$ = new Subject<NotificationHost>();

  constructor(private globalKns: KendoNotificationService) {
    /**
     * für jeden neu angemeldeten Host: nimm die Notifications für den jeweiligen Scope
     * und zeige sie mit dem übergebenen Kendo-Service an
     */
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
              appendTo: host.container
            },
            kns: host.kns
          }
        })
      ))
    ).subscribe(({ notification, kns }) => {
      kns.show(notification);
    });

    // globalen Scope anmelden
    this.notificationHosts$.next({ scope: 'global', kns: this.globalKns });
  }

  // sendet eine Notification
  notify(type: 'error' | 'success', text: string, scope = 'global') {
    this.notifications$.next({ type, text, scope });
  }

  // gibt Observable mit Notifications für einen bestimmten Scope zurück
  private getNotificationsForScope(scope: string): Observable<MyNotification> {
    return this.notifications$.pipe(filter(n => n.scope === scope));
  }

  // zum Anmelden eines Containers für lokale Notifications
  addNotificationHost(scope: string, container: ViewContainerRef, kns: KendoNotificationService) {
    this.notificationHosts$.next({ scope, container, kns });
  }
}
