import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建数据项参数
 */
export class CnItemParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.item) {
        // 判断组件取值是否为null
        if (this._model.item[this._param.valueName] === null || this._model.item[this._param.valueName] === undefined) {
          if (this._param.value !== undefined) {
            if (this._param.conditionType) {
              this._result = this.getParameter(this._param.conditionType, this._param.value);
            } else if (this._param.defaultDate) {
              const dataType = this._param.defaultDate;
              this._result = this.getDefaultDate(dataType);
            } else {
              this._result = this._param.value;
            }
          } else if (!this._param.valueName) {
            this._result = this._model.item;  // 不配valueName，则将当前属性给他 object
          }
        } else {
          if (this._param.conditionType) {
            this._result = this.getParameter(
              this._param.conditionType,
              this._model.item[this._param.valueName],
            );
          } else {
            this._result = this._model.item[this._param.valueName];
          }
        }
      }

      return this._result;
    }
  }
