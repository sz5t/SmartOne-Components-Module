import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建选中行数据参数
 */
export class CnSelectedRowParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.item) {
        this._result = this._model.item[this._param.valueName];
      }
      return this._result;
    }
  }
