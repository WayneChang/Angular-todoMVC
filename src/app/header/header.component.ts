import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  inputData: string;
  @Output() updateData = new EventEmitter();
  @Output() toggleAll = new EventEmitter();

  constructor(private list: ListService) { }

  ngOnInit() {
  }

  postData(string: string) {
    this.list.postData(string).subscribe(
      result => {
        this.inputData = '';
        this.updateData.emit();
      },
      error => {
        alert('add fail');
      },
      () => {
      }
    );
  }
}
