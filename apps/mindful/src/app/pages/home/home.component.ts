import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Record } from '../../models/dummy.model';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'mindful-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  clicked = 0;
  records$: Observable<Record[] | undefined>;

  constructor(
    private coreService: CoreService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.records$ = this.coreService.collection$;
  }

  isLargeGridItem(record: Record, modulo: number) {
    return Number(record.id) % modulo === 0;
  }

  showAppVersion() {
    if (this.clicked === 5) {
      const key = this.coreService.versionId;
      const currentVersion = localStorage.getItem(key);
      this.messageService.add({
        summary: `Aktuelle Version: ${currentVersion}`,
        closable: true,
        contentStyleClass: 'bg-gray-800',
      });
      this.clicked = 0;
    } else {
      this.clicked++;
    }
  }

  navigate(record: Record) {
    if (record.isLocked) {
      this.coreService.unlock();
    } else {
      this.router.navigate(['/detail', record.id]);
    }
  }
}
