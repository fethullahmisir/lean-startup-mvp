import { Component, OnDestroy } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'mindful-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  sub: Subscription;

  constructor(
    primeNgConfig: PrimeNGConfig,
    swUpdate: SwUpdate,
    confirmationService: ConfirmationService
  ) {
    primeNgConfig.ripple = true;

    this.sub = swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        tap(() => {
          confirmationService.confirm({
            header: 'Neue Version verfügbar',
            message: 'Möchten Sie den neuen Stand der Anwendung nutzen?',
            acceptLabel: 'Ja',
            rejectLabel: 'Nein',
            accept: () =>
              swUpdate.activateUpdate().then(() => document.location.reload()),
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
