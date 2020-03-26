import { ICnParameterResolver } from '../cn-parameter.interface';
import { CnParameterBase } from '../cn-parameter.base';

/**
 * 构建路由参数
 */
export class CnRouterParameter extends CnParameterBase implements ICnParameterResolver {
    private _result: any;
    constructor(private _param, private _model) {
      super();
    }
    public buildParameter() {
      if (this._model.router) {
        if (this._param.conditionType) {
          this._model.router.params.subscribe(r => {
            this._result = this.getParameter(this._param.conditionType, r.name);
          });
        } else {
          this._model.router.params.subscribe(r => {
            this._result = r.name;
          });
        }
      }
      return this._result;
    }
  }
