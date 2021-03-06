import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建初始化参数
 */
export class CnInitValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.initValue) {
        if (
          this._model.initValue[this._param.valueName] === null ||
          this._model.initValue[this._param.valueName] === undefined
        ) {
          if (this._param.value !== undefined) {
            if (this._param.conditionType) {
              this._result = this.getParameter(this._param.conditionType, this._model.initValue.value);
            } else if (this._param.defaultDate) {
              const dataType = this._param.defaultDate;
              this._result = this.getDefaultDate(dataType);
            } else {
              this._result = this._param.value;
            }
          }
        } else {
          if (this._param.conditionType) {
            this._result = this.getParameter(
              this._param.conditionType,
              this._model.initValue[this._param.valueName],
            );
          } else {
            this._result = this._model.initValue[this._param.valueName];
          }
        }
      }
      return this._result;
    }
  }
