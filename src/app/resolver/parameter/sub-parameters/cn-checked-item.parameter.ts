import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建勾选ID项
 */
export class CnCheckedItemParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.checkedItem) {
        // result[param['name']] = model.item;
        if (this._param.conditionType) {
          this._result = this.getParameter(this._param.conditionType, this._model.checkedItem[this._param.valueName]);
        } else {
          this._result = this._model.checkedItem[this._param.valueName];
        }
      }
      return this._result;
    }
}