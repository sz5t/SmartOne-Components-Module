import { BaseComponentsModule } from './components/base-components/base-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { mooaPlatform } from 'mooa';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';
import { DefaultInterceptor } from './core/net/http.interceptor';
import { BSN_RELATION_TRIGGER, CnRelativesMessageModel, BSN_RELATION_SUBJECT, BSN_RELATIVE_MESSAGE_SENDER, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER, BSN_COMPONENT_SERVICES } from './core/relative-core';
import { Subject } from 'rxjs';
import { ComponentProviderService } from './services/component/component-provider.service';
import { CnApiService, CnApiServiceConfiguration } from './services/api/cn-api-service.service';

registerLocaleData(zh);

const INTERCEPTOR_PROVIDES = [
  // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];

const RELATIONS_PROVIDERS = [
  {
    provide: BSN_RELATION_TRIGGER,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_RELATION_SUBJECT,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_RELATIVE_MESSAGE_SENDER,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_RELATIVE_MESSAGE_RECEIVER,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER,
    useValue: new Subject<CnRelativesMessageModel>()
  },
  {
    provide: BSN_COMPONENT_SERVICES,
    // tslint:disable-next-line: no-use-before-declare
    useClass: ComponentProviderService
  }
]

const APP_INIT_PROVIDERS = [
  CnApiService,
  CnApiServiceConfiguration
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BaseComponentsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: mooaPlatform.appBase()},
    { provide: NZ_I18N, useValue: zh_CN },
    ...APP_INIT_PROVIDERS,
    ...INTERCEPTOR_PROVIDES,
    ...RELATIONS_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
