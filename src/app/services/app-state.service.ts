import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public _subject = new Subject<String>();
  public event = this._subject.asObservable();

  public publish(data: string) {
    this._subject.next(data);
  } 
}
