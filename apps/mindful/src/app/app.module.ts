import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, Routes } from '@angular/router';

import { ServiceWorkerModule } from '@angular/service-worker';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { ErrorComponent } from './pages/error/error.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { RecordDetailComponent } from './pages/record-detail/record-detail.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CoreService } from './services/core.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DesktopGuard } from './services/desktop.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [DesktopGuard] },
  { path: 'collection', component: CollectionsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'detail/:id', component: RecordDetailComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CollectionsComponent,
    ErrorComponent,
    RecordDetailComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    RouterModule.forRoot(routes),
    GalleriaModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    CardModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DesktopGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (core: CoreService) => {
        return () => core.initService();
      },
      deps: [CoreService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    if (document && this.isInstalledAsPwa() && this.isIos()) {
      document.documentElement.style.setProperty('--safe-area', '35px');
    }
  }

  private isInstalledAsPwa(): boolean {
    if (!window || !document) return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      document.referrer.includes('android-app://')
    );
  }

  private isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
}
