import { Injectable,EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  subject = new BehaviorSubject<any>([]);
  array$ = this.subject.asObservable();

  constructor() { }

  addElementToCar(item) {
    this.array$.pipe(take(1)).subscribe(val => {
      const newArr = [...val, item];
      this.subject.next(newArr);
    })
  }

  removeItem(id: string) {
    console.log(this.array$)
  }


}
