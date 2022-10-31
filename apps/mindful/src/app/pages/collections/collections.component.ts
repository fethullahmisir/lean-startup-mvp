import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Record } from '../../models/dummy.model';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'mindful-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  collections$: Observable<Record[] | undefined>;

  constructor(private location: Location, private coreService: CoreService) {
    this.collections$ = this.coreService.collection$.pipe(
      map((projects) => projects?.filter((it) => it.bookmarked)),
      tap(console.log)
    );
  }

  removeBookmark(record: Record) {
    record.bookmarked = false;
    this.coreService.removeFromCollection(record);
  }

  back() {
    this.location.back();
  }
}
