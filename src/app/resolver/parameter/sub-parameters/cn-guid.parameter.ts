import { ICnParameterResolver } from '../cn-parameter.interface';
import { CommonUtils } from 'src/app/core/utils/common-utils';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建唯一标识参数
 */
export class CnGUIDParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._param.conditionType) {
        this._result = this.getParameter(this._param.conditionType, CommonUtils.uuID(32));
      } else {
        this._result = CommonUtils.uuID(32);
      }
      return this._result;
    }
}
