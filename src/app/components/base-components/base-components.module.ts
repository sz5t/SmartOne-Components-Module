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
import { CnBarchartComponent } from './cn-charts/cn-barchart/cn-barchart.component';
import { CnHorizontalBarchartComponent } from './cn-charts/cn-horizontal-barchart/cn-horizontal-barchart.component';
import { CnBrokenLineChartComponent } from './cn-charts/cn-broken-line-chart/cn-broken-line-chart.component';
import { CnFanChartComponent } from './cn-charts/cn-fan-chart/cn-fan-chart.component';
import { CnTimeAxisChartComponent } from './cn-charts/cn-time-axis-chart/cn-time-axis-chart.component';
import { CnMultipleYAxisChartComponent } from './cn-charts/cn-multiple-y-axis-chart/cn-multiple-y-axis-chart.component';
import { CnChartsComponent } from './cn-charts/cn-charts.component';
import { CnChartsDirective } from './cn-charts/cn-charts-directive.directive';
import { CnGridChartsComponent } from './cn-data-table/cn-data-table-items/cn-grid-charts/cn-grid-charts.component';

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
  CnGridTagComponent,
  CnGridChartsComponent, 
  // chart组件
  CnBarchartComponent, 
  CnHorizontalBarchartComponent, 
  CnBrokenLineChartComponent, 
  CnFanChartComponent, 
  CnTimeAxisChartComponent, 
  CnMultipleYAxisChartComponent, 
  CnChartsComponent
]

const DIRECTIVES = [
  CnLayoutDirective,
  CnComponentDirective,
  CnGridItemDirective,
  DynamicLayoutDirective,
  CnChartsDirective
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
