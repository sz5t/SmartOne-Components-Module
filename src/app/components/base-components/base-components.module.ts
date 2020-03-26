import { FormsModule } from '@angular/forms';
import { CnGridItemDirective } from './cn-data-table/cn-data-table-items/cn-grid-item.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnDataTableComponent } from './cn-data-table/cn-data-table.component';
import { CnToolbarComponent } from './cn-toolbar/cn-toolbar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CnLayoutComponent } from './cn-layout/cn-layout.component';
import { DynamicLayoutDirective } from './cn-layout/dynamic-layout.directive';
import { CnPageHeaderComponent } from './cn-page-header/cn-page-header.component';
import { CnLayoutDirective } from './cn-layout/cn-layout.directive';
import { CnComponentDirective } from './cn-component.directive';
import { CnTabsComponent } from './cn-tabs/cn-tabs.component';
import { CnGridRadioComponent } from './cn-data-table/cn-data-table-items/cn-grid-radio/cn-grid-radio.component';
import { CnGridCheckboxComponent } from './cn-data-table/cn-data-table-items/cn-grid-checkbox/cn-grid-checkbox.component';
import { CnGridGridSelectComponent } from './cn-data-table/cn-data-table-items/cn-grid-grid-select/cn-grid-grid-select.component';
import { CnGridDatePickerComponent } from './cn-data-table/cn-data-table-items/cn-grid-date-picker/cn-grid-date-picker.component';
import { CnGridMonthPickerComponent } from './cn-data-table/cn-data-table-items/cn-grid-month-picker/cn-grid-month-picker.component';
import { CnGridWeekPickerComponent } from './cn-data-table/cn-data-table-items/cn-grid-week-picker/cn-grid-week-picker.component';
import { CnGridYearPickerComponent } from './cn-data-table/cn-data-table-items/cn-grid-year-picker/cn-grid-year-picker.component';
import { CnGridRangePickerComponent } from './cn-data-table/cn-data-table-items/cn-grid-range-picker/cn-grid-range-picker.component';
import { CnGridCustomSelectComponent } from './cn-data-table/cn-data-table-items/cn-grid-custom-select/cn-grid-custom-select.component';
import { CnGridCodeEditComponent } from './cn-data-table/cn-data-table-items/cn-grid-code-edit/cn-grid-code-edit.component';
import { CnGridTextareaComponent } from './cn-data-table/cn-data-table-items/cn-grid-textarea/cn-grid-textarea.component';
import { CnGridSwitchComponent } from './cn-data-table/cn-data-table-items/cn-grid-switch/cn-grid-switch.component';
import { CnGridInputComponent } from './cn-data-table/cn-data-table-items/cn-grid-input/cn-grid-input.component';
import { CnGridSelectComponent } from './cn-data-table/cn-data-table-items/cn-grid-select/cn-grid-select.component';
import { CnGridTagComponent } from './cn-data-table/cn-data-table-items/cn-grid-tag/cn-grid-tag.component';

const COMPONENTS = [
  CnDataTableComponent, 
  CnToolbarComponent, 
  CnLayoutComponent, 
  CnPageHeaderComponent, 
  CnTabsComponent,
  CnGridRadioComponent,
  CnGridCheckboxComponent,
  CnGridGridSelectComponent,
  CnGridDatePickerComponent,
  CnGridMonthPickerComponent,
  CnGridWeekPickerComponent,
  CnGridYearPickerComponent,
  CnGridRangePickerComponent,
  CnGridCustomSelectComponent,
  CnGridCodeEditComponent,
  CnGridTextareaComponent,
  CnGridSwitchComponent,
  CnGridRadioComponent,
  CnGridCheckboxComponent,
  CnGridGridSelectComponent,
  CnGridDatePickerComponent,
  CnGridMonthPickerComponent,
  CnGridWeekPickerComponent,
  CnGridYearPickerComponent,
  CnGridRangePickerComponent,
  CnGridCustomSelectComponent,
  CnGridCodeEditComponent,
  CnGridTextareaComponent,
  CnGridInputComponent,
  CnGridSelectComponent,
  CnGridTagComponent
]

const DIRECTIVES = [
  CnLayoutDirective,
  CnComponentDirective,
  CnGridItemDirective,
  DynamicLayoutDirective
]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports:[
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents:[
    ...COMPONENTS
  ]
})
export class BaseComponentsModule { }