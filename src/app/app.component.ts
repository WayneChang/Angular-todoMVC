import { Component } from '@angular/core';
import { ListService } from './list.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'doggy-training-test';

  constructor( private list: ListService) {
    this.list.getData().subscribe( value => {
      console.log(value);
    })
  }
}
