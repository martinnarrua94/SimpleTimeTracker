import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import * as projectActions from '../app/project/state/project.actions';
import * as projectTaskActions from '../app/project-task/state/project-task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SimpleTimeTracker';
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new projectActions.Load());

    this.store.dispatch(new projectTaskActions.Load());
  }  
  
}
