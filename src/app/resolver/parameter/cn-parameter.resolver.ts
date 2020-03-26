import { ICnParameterModel } from './cn-parameter.interface';
import { CommonUtils } from 'src/app/core/utils/common-utils';
import { CnTempValueParameter } from './sub-parameters/cn-temp-value.parameter';
import { CnValueParamParameter } from './sub-parameters/value.parameter';
import { CnItemParameter } from './sub-parameters/cn-item.parameter';
import { CnComponentValueParameter } from './sub-parameters/cn-component-value.parameter';
import { CnSelectedRowParameter } from './sub-parameters/cn-selected-row.paramster';
import { CnCheckedParameter } from './sub-parameters/cn-checked.parameter';
import { CnSelectedParameter } from './sub-parameters/cn-selected.parameter';
import { CnCheckedItemParameter } from './sub-parameters/cn-checked-item.parameter';
import { CnCacheValueParameter } from './sub-parameters/cn-cache-value.parameter';
import { CnInitValueParameter } from './sub-parameters/cn-init-value.parameter';
import { CnCascadeValueParameter } from './sub-parameters/cn-cascade-value.paramster';
import { CnReturnValueParameter } from './sub-parameters/cn-return-value.parameter';
import { CnRouterParameter } from './sub-parameters/cn-router.parameter';
import { CnAddedRows } from './sub-parameters/cn-added-rows.parameter';
import { CnEditedRows } from './sub-parameters/cn-edited-rows.parameter';
import { CnValidationParameter } from './sub-parameters/cn-validation.parameter';
import { CnGUIDParameter } from './sub-parameters/cn-guid.parameter';
import { CnCheckedRowParameter } from './sub-parameters/cn-checked-row.parameter';

export class CnParameterResolver {
    public static resolve(model: ICnParameterModel) {
      const result: any = {};
      if (Array.isArray(model.params)) {
        for (const param of model.params) {
          const paramType = param.type;
          if (paramType) {
            console.log(paramType);
            const val = this[paramType](param, model);
            if (param.dataType && (val || val === 0)) {
              result[param.name] = CommonUtils.getResultByDataType(val, param.dataType);
            } else if (param.dataType === 'nullable') {
              result[param.name] = CommonUtils.getResultByDataType(val, param.dataType);
            } else {
              // tslint:disable-next-line: no-unused-expression
              (val || val === 0) && (result[param.name] = val);
            }
          }
        }
      }
      return result;
    }

    private static tempValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnTempValueParameter(param, model).buildParameter();
    }

    private static value(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnValueParamParameter(param, model).buildParameter();
    }

    private static GUID(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnGUIDParameter(param, model).buildParameter();
    }

    private static item(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnItemParameter(param, model).buildParameter();
    }

    private static componentValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnComponentValueParameter(param, model).buildParameter();
    }

    private static checkedRow(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnCheckedRowParameter(param, model).buildParameter();
    }

    private static selectedRow(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnSelectedRowParameter(param, model).buildParameter();
    }

    private static checked(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnCheckedParameter(param, model).buildParameter();
    }

    private static selected(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnSelectedParameter(param, model).buildParameter();
    }

    private static checkedItem(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnCheckedItemParameter(param, model).buildParameter();
    }

    private static cacheValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnCacheValueParameter(param, model).buildParameter();
    }

    private static initValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnInitValueParameter(param, model).buildParameter();
    }

    private static cascadeValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnCascadeValueParameter(param, model).buildParameter();
    }

    private static returnValue(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnReturnValueParameter(param, model).buildParameter();
    }

    private static defaultWeek(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnItemParameter(param, model).buildParameter();
    }

    //   private defaultDay(param) {
    //     // tslint:disable-next-line: no-use-before-declare
    //     return new ItemParameter(param, model).buildParameter();
    //   }

    //   private defaultMonth(param) {
    //     // tslint:disable-next-line: no-use-before-declare
    //     return new ItemParameter(param, model).buildParameter();
    //   }

    private static router(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnRouterParameter(param, model).buildParameter();
    }

    public static addedRows(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnAddedRows(param, model).buildParameter();
    }

    public static editedRows(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnEditedRows(param, model).buildParameter();
    }

    public static validation(param, model) {
      // tslint:disable-next-line: no-use-before-declare
      return new CnValidationParameter(param, model).buildParameter();
    }
  }