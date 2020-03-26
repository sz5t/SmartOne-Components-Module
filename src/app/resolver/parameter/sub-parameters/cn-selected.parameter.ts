import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建选中项参数
 */
export class CnSelectedParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.item) {
        //  result[param['name']] = model.item[param['valueName']];
        if (this._param.conditionType) {
          this._result = this.getParameter(
            this._param.conditionType,
            this._model.this._item[this._param.valueName],
          );
        } else {
          this._result = this._model.item[this._param.valueName];
        }
      }
      return this._result;
    }
  }