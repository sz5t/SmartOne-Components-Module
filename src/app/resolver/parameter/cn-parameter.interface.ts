import { ActivatedRoute } from '@angular/router';
import { getISOYear, getISOWeek, getMonth, getDate } from 'date-fns';

export interface ICnParameterModel {
  params: any[];
  tempValue?: any;
  item?: any;
  componentValue?: any;
  initValue?: any;
  cacheValue?: any;
  cascadeValue?: any;
  returnValue?: any;
  router?: ActivatedRoute;
  addedRows?: any[];
  editedRows?: any[];
  validation?: any[];
  checkedItem?: any;
  outputValue?: any;
}

export interface ICnParameterResolver {
    buildParameter(): any;
}