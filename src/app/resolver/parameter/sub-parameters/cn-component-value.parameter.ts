import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建组件值参数
 */
export class CnComponentValueParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      const cmpVal = this._model['componentValue'];
      // 判断组件取值是否为null
      if (
        cmpVal[this._param.valueName] === null ||
        cmpVal[this._param.valueName] === undefined
      ) {
        if (this._param.value !== undefined) {
          if (this._param.conditionType) {
            this._result = this.getParameter(this._param.conditionType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
  
      } else if (cmpVal === 0) {
  
      }
      else {
        if (this._param.conditionType) {
          this._result = this.getParameter(
            this._param.conditionType,
            cmpVal[this._param.valueName],
          );
        } else {
          this._result = cmpVal[this._param.valueName];
        }
  
      }
  
      return this._result;
    }
}
