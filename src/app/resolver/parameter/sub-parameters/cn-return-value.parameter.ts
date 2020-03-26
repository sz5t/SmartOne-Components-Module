import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建返回值参数
 */
export class CnReturnValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.returnValue) {
        this._result = this._model.returnValue[this._param.valueName];
      }
      return this._result;
    }
  }
