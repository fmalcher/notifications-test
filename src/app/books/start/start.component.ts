import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorAction, globalErrorAction, successAction } from '../store/book.actions';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
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
