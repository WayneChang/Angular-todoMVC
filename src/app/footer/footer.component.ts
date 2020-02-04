import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ListService } from '../list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() totalItem: any;
  @Output() clearFinish = new EventEmitter();
  totalFinish = 0;
  unFinish = 0;

  constructor(private list: ListService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalFinish = 0;
    this.unFinish = 0;
    const total = changes.totalItem.currentValue;
    console.log('footer' + changes.totalItem.currentValue);
    total.forEach( element => {
      if (element.isDone) {
        this.totalFinish++;
      } else {
        this.unFinish++;
      }
    });
  }

  ngOnInit() {
    this.refleshData();
  }

  refleshData() {
    this.list.getData().pipe(
      map((val: any) => {
        return val.map( (item: any) => {
          return {
            id: item.id,
            title: item.title,
            isDone: item.isDone,
            toDo: false
          };
        });
      })
    ).subscribe( (value: any) => {
      value.forEach(element => {
        if (element.isDone) {
          this.totalFinish++;
        } else {
          this.unFinish++;
        }
      });
    });
  }
}
