import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/notification.service';
import { NotificationService as KendoNotificationService } from "@progress/kendo-angular-notification";
import { errorAction, globalErrorAction, successAction } from '../store/book.actions';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [KendoNotificationService]
})
export class StartComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(private store: Store, private ns: NotificationService, private kns: KendoNotificationService) {
  }
  
  ngOnInit(): void {
    this.ns.addNotificationHost('books', this.container, this.kns);
  }

  dispatchSuccess() {
    this.store.dispatch(successAction());
  }

  dispatchError() {
    this.store.dispatch(errorAction());
  }

  dispatchGlobalError() {
    this.store.dispatch(globalErrorAction());
  }

}
