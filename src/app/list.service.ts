import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  deleteData(item: any) {
    return this.https.delete(`${environment.api}` + '/' + item.id);
  }

  deleteFinish(item: any) {
    this.https.delete(`${environment.api}` + '/' + item.id).subscribe();
    return this.getData();
  }

  toggleDone(item: any) {
    // console.log(item.isDone);
    return this.https.patch(`${environment.api}` + '/' + item.id, {isDone: !item.isDone});
  }

  toggleAll() {
    // console.log(item.isDone);
    this.getData().subscribe(
      (value: Array<any>) => {
        value.forEach((val: any) => {
          this.https.patch(`${environment.api}` + '/' + val.id, {isDone: true}).subscribe();
        });
      }
    );
  }
}
