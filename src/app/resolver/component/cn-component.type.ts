import { Type } from "@angular/core";

import { CnDataTableComponent } from "src/app/components/base-components/cn-data-table/cn-data-table.component";

import { CnToolbarComponent } from "src/app/components/base-components/cn-toolbar/cn-toolbar.component";

export const COMPONENT_TYPES: { [type: string]: Type<any> } = {
    cnDataTable: CnDataTableComponent,
    cnToolbar: CnToolbarComponent,
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