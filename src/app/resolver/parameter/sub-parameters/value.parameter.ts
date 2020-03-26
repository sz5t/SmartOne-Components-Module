import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建固定值参数
 */
export class CnValueParamParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._param.value === 'null') {
        this._param.value = null;
      }
      // result[param['name']] = param.value;
      if (this._param.conditionType) {
        this._result = this.getParameter(this._param.conditionType, this._param.value);
      } else {
        this._result = this._param.value;
      }
      return this._result;
    }
  }