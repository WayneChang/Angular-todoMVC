import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListService } from '../list.service';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  lists: any;
  newInput: any;
  @Input() updateTo: any;

  constructor(private list: ListService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.updateTo.currentValue);
    this.lists = changes.updateTo.currentValue;
  }

  ngOnInit() {
    this.list.getData().pipe(
      map((val: any) => {
        console.log(val);
        return val.map( (item: any) => {
          console.log(item);
          return {
            id: item.id,
            title: item.title,
            isDone: item.isDone,
            toDo: false
          };
        });
      })
    ).subscribe( value => {
      // console.log(value);
      this.lists = value;
    });
  }

  editing(item: any) {
    item.toDo = true;
  }

  enterEdit(item: any, s: string) {
    // console.log(item, s);
    this.list.patchData(item, s).subscribe(
      result => {
      },
      error => {
        alert('add fail');
      },
      () => {
        this.list.getData().pipe(
          map((val: any) => {
            console.log(val);
            return val.map( (item: any) => {
              console.log(item);
              return {
                id: item.id,
                title: item.title,
                isDone: item.isDone,
                toDo: false
              };
            });
          })
        ).subscribe( value => {
          // console.log(value);
          this.lists = value;
        });
      }
    );
    item.toDo = false;
  }

  blurEdit(item: any) {
    // console.log(item);
    // this.list.patchData(item);
    item.toDo = false;
  }
}
