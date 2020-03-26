import { ICnRelationResolver } from '../cn-relation.interface';
import { CN_TRIGGER_TYPE } from '../../trigger/cn-trigger.interface';
import { CnRelativesMessageModel } from 'src/app/core/relative-core';

/**
 * 组件消息发送解析器
 */
export class CnComponentSenderResolver implements ICnRelationResolver{
    private _beforeTriggerCfg;
    public get beforeTriggerCfg() {
        return this._beforeTriggerCfg;
    }
    public set beforeTriggerCfg(value) {
        this._beforeTriggerCfg = value;
    }
    private _afterTriggerCfg;
    public get afterTriggerCfg() {
        return this._afterTriggerCfg;
    }
    public set afterTriggerCfg(value) {
        this._afterTriggerCfg = value;
    }
    private _conditionCfg;
    public get conditionCfg() {
        return this._conditionCfg;
    }
    public set conditionCfg(value) {
        this._conditionCfg = value;
    }
    private _ajaxCfg;
    public get ajaxCfg() {
        return this._ajaxCfg;
    }
    public set ajaxCfg(value) {
        this._ajaxCfg = value;
    }
    private _cascade;
    public get cascade() {
        return this._cascade;
    }
    public set cascade(value) {
        this._cascade = value;
    }

    private _currentData;
    public get currentData() {
        return this._currentData;
    }
    public set currentData(value) {
        this._currentData = value;
    }
    constructor(private _componentInstance: any) { }
    resolve(cfg: any) {
        switch (cfg.triggerType) {
            case CN_TRIGGER_TYPE.STATE:
                this.handleStateType(cfg);
                break;
            case CN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType(cfg);
                break;
            case CN_TRIGGER_TYPE.ACTION:
                this.handleActionType(cfg);
                break;
            case CN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType(cfg);
                break;
            case CN_TRIGGER_TYPE.LINK:
                this.handleLinkType(cfg);
                break;
        }
    }

    handleStateType(cfg: any) {
        // 前置条件判断
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleBehaviorType(cfg: any) {
        // 前置条件判断
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleOperationType(cfg: any) {
        // 前置条件判断

        // 执行操作, 该功能不由组件实现
        if (!this.conditionValidator(cfg.condition)) {
            return false;
        }
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleActionType(cfg) {
        // 前置条件判断

        // 该功能不由组件实现
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleLinkType(cfg) {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    /**
     * 发送验证消息
     */
    sendValidationMessage(cfg, validationData) {
        let options = {}
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }

            options = this.getOptionParamsObj(c.params, validationData, false);

            this._componentInstance.componentService.commonRelationSubject.next(
                new CnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    { ...validationData, ...options }
                )
            )
        }
    }

    /**
     * 发送错误消息
     */
    sendErrorMessage(cfg, errorData) {
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }
            this._componentInstance.componentService.commonRelationSubject.next(
                new CnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    errorData
                )
            )
        }
    }

    /**
     * 发送通用消息
     * @param cfg 消息配置 
     */
    sendMessage(cfg, isArray = false, data?) {
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }


            const options = this.getOptionParamsObj(c.params, data, isArray);
            console.log('send message', cfg.senderId, options);
            this._componentInstance.componentService.commonRelationSubject.next(
                new CnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    options
                )
            )
        }
    }

    /**
     * 获取组件当前状态下的所有参数
     * @param paramsCfg 消息参数配置
     */
    getOptionParamsObj(paramsCfg, data?, isArray = false) {
        return this._componentInstance.buildParameters(paramsCfg, data, isArray);
    }

    private conditionValidator(condCfg): boolean {
        if (!condCfg) {
            return true;
        }
        const result = [];
        for (const cfg of condCfg.state) {
            switch (cfg.type) {
                case 'component':
                    const componentResult = this.checkComponentProperty(cfg);
                    result.push(componentResult);
                    break;
            }
        }
        return result.findIndex(res => !res) < 0;
    }

    private checkComponentProperty(expCfg) {
        // 判断取值的类型
        const allCheckResult = [];
        switch (expCfg.type) {
            case 'component':
                const componentValue = this._componentInstance[this._componentInstance.COMPONENT_PROPERTY[expCfg.valueName]];
                for (const exp of expCfg.expression) {
                    switch (exp.type) {
                        case 'property':
                            const valueCompareObj = this.buildMatchObject(componentValue, exp);
                            const valueMatchResult = this.matchResolve(valueCompareObj, exp.match);
                            allCheckResult.push(valueMatchResult);
                            break;
                        case 'element':
                            const elementResult = [];
                            for (const element of componentValue) {
                                const elementCompareObj = this.buildMatchObject(element, exp);
                                elementResult.push(this.matchResolve(elementCompareObj, exp.match));
                            }
                            const elementMatchResult = elementResult.findIndex(res => !res) < 0;
                            allCheckResult.push(elementMatchResult);
                    }
                }
                break;
        }
        return allCheckResult.findIndex(res => !res) < 0;
    }

    private buildMatchObject(componentValue, expCfg) {
        const value = componentValue[expCfg.name];
        const matchValue = expCfg.matchValue;
        const matchValueFrom = expCfg.matchValueFrom;
        const matchValueTo = expCfg.matchValueTo;
        return {
            'value': value,
            'matchValue': matchValue,
            'matchValueFrom': matchValueFrom,
            'matchValueTo': matchValueTo
        }
    }


    private matchResolve(compareValue, expression) {
        switch (expression) {
            case 'eq': // =
                return compareValue.value === compareValue.matchValue;
            case 'neq': // !=
                return compareValue.value !== compareValue.matchValue;
            case 'ctn': // like
                return compareValue.matchValue.indexOf(compareValue.value) > 0;
            case 'nctn': // not like
                return compareValue.matchValue.indexOf(compareValue.value) <= 0;
            case 'in': // in  如果是input 是这样取值，其他则是多选取值
                let in_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    in_result = compareValue.matchValue.findIndex(compareValue.value) > 0;
                }
                return in_result;
            case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
                let nin_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    nin_result = compareValue.matchValue.findIndex(compareValue.value) <= 0;
                }
                return nin_result;
            case 'btn': // between
                return (compareValue.matchValueFrom <= compareValue.value)
                    && (compareValue.matchValueTo >= compareValue.value);
            case 'ge': // >=
                return compareValue.value >= compareValue.matchValue;
            case 'gt': // >
                return compareValue.value > compareValue.matchValue;
            case 'le': // <=
                return compareValue.value <= compareValue.matchValue;
            case 'lt': // <
                return compareValue.value < compareValue.matchValue;
            default:
            case 'regexp': // 正在表达式匹配
                const regexp = new RegExp(compareValue.matchValue);
                return regexp.test(compareValue.value);

        }
    }
}