import { ICnTriggerResolver } from './cn-trigger.interface';
import { CnTriggerBase } from './cn-trigger.base';

export class CnTriggerResolver extends CnTriggerBase implements ICnTriggerResolver {
    constructor(public _triggerMsg: any, public _componentInstance: any) {
        super(_triggerMsg, _componentInstance);
    }

    public resolve() {
        // 前置条件判断
        if (!this.conditionValidator(this._triggerMsg.options.condition)) {
            return false;
        }

        if (!this.beforeOperationValidator(this._triggerMsg.options.beforeOperation)) {
            return false;
        }

        // 执行组件具体方法
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        if (this._triggerMsg.options) {
            // tslint:disable-next-line: no-unused-expression
            console.log('---------', method);
            method && this._componentInstance[method](this._triggerMsg.options);
        } else {
            // tslint:disable-next-line: no-unused-expression
            method && this._componentInstance[method]();
        }
    }

    // public resolve1() {
    //     switch (this._triggerMsg.trigger.triggerType) {
    //         case BSN_TRIGGER_TYPE.STATE:
    //             this.handleStateType();
    //             break;
    //         case BSN_TRIGGER_TYPE.BEHAVIOR:
    //             this.handleBehaviorType();
    //             break;
    //         case BSN_TRIGGER_TYPE.ACTION:
    //             this.handleActionType();
    //             break;
    //         case BSN_TRIGGER_TYPE.OPERATION:
    //             this.handleOperationType();
    //             break;
    //         case BSN_TRIGGER_TYPE.LINK:
    //             this.handleLinkType();
    //             break;
    //     }
    // }

    // handleStateType() {
    //     // 前置条件判断
    //     if (!this.conditionValidator(this._triggerMsg.options.condition)) {
    //         return false;
    //     }
    //     // 执行组件具体方法
    //     const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
    //     if (this._triggerMsg.options) {
    //         method && this._componentInstance[method](this._triggerMsg.options);
    //     } else {
    //         method && this._componentInstance[method]();
    //     }

    // }

    // handleBehaviorType() {
    //     // 前置条件判断
    //     // 该功能不由组件实现
    //     const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
    //     this._componentInstance[method](this._triggerMsg.options);
    // }

    // handleOperationType() {
    //     // 前置条件 state
    //     // 执行判断 condition
    //     if (!this.conditionValidator(this._triggerMsg.options.condition)) {
    //         return false;
    //     }

    //     if (!this.beforeOperationValidator(this._triggerMsg.options.beforeOperation)) {
    //         return false;
    //     }

    //     // 获取 ajaxConfig



    //     // 该功能不由组件实现

    //     // 执行操作, 该功能不由组件实现
    //     if (this._triggerMsg.options.ajaxConfig) {
    //         const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
    //         this._componentInstance[method](this._triggerMsg.options);
    //     }

    //     // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    // }

    // handleActionType() {
    //     const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
    //     if (method) {
    //         this._componentInstance[method](this._triggerMsg.options);
    //     }

    //     // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    // }

    // handleLinkType() {
    //     // 前置条件判断

    //     // 执行跳转功能, 该功能不由组件实现
    //     const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
    //     this._componentInstance[method](this._triggerMsg.options);
    //     // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);

    // }
}
