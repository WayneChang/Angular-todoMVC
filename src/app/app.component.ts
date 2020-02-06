import { Component, Output, EventEmitter } from '@angular/core';
import { ListService } from './list.service';
import { map } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'doggy-training-test';
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

  toggleAll() {
    this.list.toggleAll();
    this.list.getData().pipe(
      map((val: any) => {
        // console.log(val);
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
      console.log(this.lists);
    });
  }

  toggleReflesh() {
    this.list.getData().pipe(
      map((val: any) => {
        // console.log(val);
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

  clearFinish() {
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
      value.forEach((val, index) => {
        if (val.isDone) {
          this.list.deleteData(val).subscribe();
        }
      });
      this.update();
    });
  }
}
