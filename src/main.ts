import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { mooaPlatform } from 'mooa';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// mooaPlatform.mount('micro-app').then(opts => {
//   platformBrowserDynamic().bootstrapModule(AppModule).then(module => {
//     // tslint:disable-next-line: no-string-literal
//     opts['attachUnmount'](module);
//   });
// });
