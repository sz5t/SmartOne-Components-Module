import { BaseComponentsModule } from './../../components/base-components/base-components.module';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDemoComponent } from './data-table-demo/data-table-demo.component';
import { BarchartDemoComponent } from './barchart-demo/barchart-demo.component';

const router: Route[] = [
  {
    path: '', redirectTo: '/data-table-demo', pathMatch: 'full'
  },
  {
    path: 'data-table-demo', component: DataTableDemoComponent
  },
  {
    path: 'barchart-demo', component: BarchartDemoComponent
  }
]

@NgModule({
  declarations: [
    DataTableDemoComponent,
    BarchartDemoComponent
  ],
  imports: [
    CommonModule,
    BaseComponentsModule,
    RouterModule.forChild(router)
  ],
  exports:[
    DataTableDemoComponent,
    BarchartDemoComponent
  ]
})
export class DemoModule { }
