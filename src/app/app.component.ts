import { Component, Output, EventEmitter } from '@angular/core';
import { ListService } from './list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'doggy-training-test';
  @Output() updateTo = new EventEmitter();
  lists: any = [];

  constructor( private list: ListService) {
  }

  update() {
    this.list.getData().pipe(
      map((val: any) => {
        return val.map((item: any) => {
            return {
              id: item.id,
              title: item.title,
              isDone: item.isDone,
              toDo: false
            };
          });
      })
    ).subscribe( value => {
      this.lists = value;
    });
  }
}
