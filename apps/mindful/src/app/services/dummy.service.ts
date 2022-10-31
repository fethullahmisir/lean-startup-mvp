import { Injectable } from '@angular/core';
import { Record } from '../models/dummy.model';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  private dummyData: Record[];

  constructor() {
    this.dummyData = this.generate();
  }

  getDummyData(): Record[] {
    return this.dummyData;
  }

  private generate(): Record[] {
    return [
      {
        id: '1',
        urls: ['assets/img/1.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '2',
        urls: ['assets/img/2.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '3',
        urls: ['assets/img/3.jpg', 'assets/img/4.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '5',
        urls: ['assets/img/5.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '6',
        urls: ['assets/img/6.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '8',
        urls: ['assets/img/8.jpg'],
        isLocked: false,
        bookmarked: false,
      },
      {
        id: '9',
        urls: ['assets/img/9.jpg'],
        isLocked: true,
        bookmarked: false,
      },
      {
        id: '10',
        urls: ['assets/img/10.jpg'],
        isLocked: true,
        bookmarked: false,
      },
    ];
  }
}
