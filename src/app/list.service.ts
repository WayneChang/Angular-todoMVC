import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor( private https: HttpClient ) { }

  getData() {
    return this.https.get(`${environment.api}`);
  }

  postData(string: string) {
  let ay: any = [];
  let lastID = null;

  this.getData().subscribe(value => {
    ay = value;
    ay.forEach( (value,index) => {
      if (ay.length - 1 === index) {
        lastID = value.id + 1;
        // console.log(value.id);
      }
    });
  });

  return this.https.post(`${environment.api}`, {
      id: lastID,
      title: string,
      isDone: false
    });
  }

  patchData(item: any, s: string) {
    // console.log(item, s);
    return this.https.patch(`${environment.api}` + '/' + item.id, {
      // id: item.id,
      title: s,
      // isDone: item.isDone
    });
  }
}
