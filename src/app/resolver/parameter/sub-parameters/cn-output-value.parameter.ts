import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建及联参数
 */
export class CnOutputValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.outputValue) {
        if (this._param.conditionType) {
          this._result = this.getParameter(
            this._param.conditionType,
            this._model.outputValue[this._param.valueName]
          );
        } else {
          this._result = this._model.outputValue[this._param.valueName];
        }
      }
      return this._result;
    }
  }
