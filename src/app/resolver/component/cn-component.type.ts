import { Type } from "@angular/core";

import { CnDataTableComponent } from "src/app/components/base-components/cn-data-table/cn-data-table.component";

import { CnToolbarComponent } from "src/app/components/base-components/cn-toolbar/cn-toolbar.component";
import { CnBarchartComponent } from 'src/app/components/base-components/cn-charts/cn-barchart/cn-barchart.component';
import { CnHorizontalBarchartComponent } from 'src/app/components/base-components/cn-charts/cn-horizontal-barchart/cn-horizontal-barchart.component';
import { CnBrokenLineChartComponent } from 'src/app/components/base-components/cn-charts/cn-broken-line-chart/cn-broken-line-chart.component';
import { CnFanChartComponent } from 'src/app/components/base-components/cn-charts/cn-fan-chart/cn-fan-chart.component';
import { CnTimeAxisChartComponent } from 'src/app/components/base-components/cn-charts/cn-time-axis-chart/cn-time-axis-chart.component';
import { CnMultipleYAxisChartComponent } from 'src/app/components/base-components/cn-charts/cn-multiple-y-axis-chart/cn-multiple-y-axis-chart.component';
import { CnChartsComponent } from 'src/app/components/base-components/cn-charts/cn-charts.component';

export const COMPONENT_TYPES: { [type: string]: Type<any> } = {
    cnDataTable: CnDataTableComponent,
    cnToolbar: CnToolbarComponent,
    cnBarchart: CnBarchartComponent,
    cnHorizontalBarchart: CnHorizontalBarchartComponent,
    cnBrokenLineChart: CnBrokenLineChartComponent,
    cnFanChart: CnFanChartComponent,
    cnTimeAxisChart: CnTimeAxisChartComponent,
    cnMultipleYAxisChart: CnMultipleYAxisChartComponent,
    cnCharts: CnChartsComponent
    // form: CnDataFormComponent,
    // cnTree: CnTreeComponent,
    // cnTreeTable: CnTreeTableComponent,
    // cnDescription: CnDescriptionsComponent,
    // cnSteps: CnStepsComponent,
    // cnStatistic: CnStatisticComponent,
    // cnProgress: CnProgressComponent,
    // cnCalendar: CnCalendarComponent,
    // cfgLayoutPage: CfgLayoutPageComponent,
    // cnCardList: CnCardListComponent
};