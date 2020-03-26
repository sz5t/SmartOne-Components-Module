import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建缓存参数
 */
export class CnCacheValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.cacheValue) {
        const cache = this._model.cacheValue.getNone('userInfo');
        if (this._param.conditionType) {
          this._result = this.getParameter(this._param.conditionType, cache[this._param.valueName]);
        } else {
          this._result = cache[this._param.valueName];
        }
      }
      return this._result;
    }
  }
