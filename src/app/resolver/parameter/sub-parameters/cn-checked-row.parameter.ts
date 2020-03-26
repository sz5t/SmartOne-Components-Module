import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建勾选表格行数据参数
 */
export class CnCheckedRowParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.item) {
        if (this._param.conditionType) {
          this._result = this.getParameter(
            this._param.conditionType,
            this._model.item[this._param.valueName],
          );
        } else {
          this._result = this._model.item[this._param.valueName];
        }
      }
      return this._result;
    }
  }
