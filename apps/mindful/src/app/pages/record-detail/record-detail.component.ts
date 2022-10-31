import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Record } from '../../models/dummy.model';
import { CoreService } from '../../services/core.service';
import { DummyService } from '../../services/dummy.service';

@Component({
  selector: 'mindful-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss'],
})
export class RecordDetailComponent {
  record: Record | undefined;
  recommandations: Record[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private dummayService: DummyService,
    private location: Location,
    private coreService: CoreService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.record = this.coreService.findById(id);
    });
    this.recommandations = this.dummayService.getDummyData();
  }

  save() {
    if (!this.record) return;
    this.record.bookmarked = !this.record.bookmarked;
    this.coreService.saveToCollection(this.record);
  }

  async share() {
    if (!this.record) return;

    const length = this.record.urls[0].length;
    const fileName = this.record.urls[0].substring(length - 5, length);

    this.http
      .get(this.record.urls[0], { observe: 'response', responseType: 'blob' })
      .subscribe((blob) => {
        if (blob.body)
          navigator
            .share({
              files: [new File([blob.body], fileName)],
            })
            .then();
      });
  }

  back() {
    this.location.back();
  }
}
