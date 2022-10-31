import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, map } from 'rxjs';
import { Record } from '../models/dummy.model';
import { DummyService } from './dummy.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly collectionId = 'collections';
  public readonly versionId = 'appVersion';

  private latestVersion = 1;

  private collectionSubject$ = new BehaviorSubject<Record[] | undefined>(
    undefined
  );

  collection$ = this.collectionSubject$.asObservable();

  constructor(
    private dialog: ConfirmationService,
    private dummyService: DummyService
  ) {
    const collections = localStorage.getItem(this.collectionId);
    if (collections) {
      this.collectionSubject$.next(JSON.parse(collections));
    }
  }

  initService(): void {
    // const currentVersion = localStorage.getItem(this.versionId);

    // if (currentVersion) {
    //   console.log(currentVersion);
    // } else {
    //   localStorage.clear();
    //   setTimeout(() => {
    //     localStorage.setItem(this.versionId, this.latestVersion.toString());
    //   }, 400);
    // }

    // const collections = localStorage.getItem(this.collectionId);
    // if (!collections) {
    //   console.log('Init collection');
    //   const records = this.dummyService.getDummyData();
    //   localStorage.setItem(this.collectionId, JSON.stringify(records));
    //   this.collectionSubject$.next(records);
    // }

    const records = this.dummyService.getDummyData();
    this.collectionSubject$.next(records);
  }

  unlock() {
    this.dialog.confirm({
      header: 'Premium freischalten',
      message: 'Methoden sind nur im Premium enthalten',
      rejectLabel: 'Abbrechen',
      acceptVisible: false,
    });
  }

  saveToCollection(newRecord: Record) {
    newRecord.bookmarked = true;
    let records = this.collectionSubject$.value;

    if (records) {
      const index = records.findIndex((it) => it.id === newRecord.id);
      if (index > 0) {
        records[index] = newRecord;
      } else {
        records.push(newRecord);
      }
    } else {
      records = [newRecord];
    }

    localStorage.setItem(this.collectionId, JSON.stringify(records));
    this.collectionSubject$.next(records);
  }

  removeFromCollection(record: Record) {
    record.bookmarked = false;
    const records = this.collectionSubject$.value;

    if (records) {
      const index = records.findIndex((it) => it.id === record.id);

      if (index >= 0) {
        records.splice(index, 1);
        localStorage.setItem(this.collectionId, JSON.stringify(records));
        this.collectionSubject$.next(records);
      }
    }
  }

  findById(id: string): Record | undefined {
    return this.collectionSubject$.value?.find((i) => i.id === id);
  }
}
