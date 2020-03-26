import { ICnParameterModel, ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建临时变量参数
 */
export class CnTempValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.tempValue && this._model.tempValue[this._param.valueName]) {
        if (this._param.conditionType) {
          this._result = this.getParameter(
            this._param.conditionType,
            this._model.tempValue[this._param.valueName]);
        } else {
          this._result = this._model.tempValue[this._param.valueName];
        }
      } else if (!this._param.valueName) {
        this._result = this._model.tempValue;  // 不配valueName，则将当前属性给他 object
      } else {
        if (this._param.value === null || this._param.value === '' || this._param.value === 0) {
          if (this._param.conditionType) {
            this._result = this.getParameter(this._param.conditionType, this._param.value);
          } else {
            this._result = this._param.value;
          }
        } else if (this._param.defaultDate) {
          const dataType = this._param.defaultDate;
          const dValue = this.getDefaultDate(dataType);
          if (this._param.conditionType) {
            this._result = this.getParameter(this._param.conditionType, dValue);
          } else {
            this._result = dValue;
          }
        } else {
          this._result = this._param.value;
        }
      }
      return this._result;
    }
  }