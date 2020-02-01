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

}
