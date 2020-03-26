export class CnTriggerBase {
    constructor(public _triggerMsg: any, public _componentInstance: any) {}
    public beforeOperationValidator(beforeCfg) {

        if (!beforeCfg) {
            return true;
        }
    }

    public conditionValidator(condCfg): boolean {
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

    public checkComponentProperty(expCfg) {
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

    public buildMatchObject(componentValue, expCfg) {
        let value;
        if (expCfg.name) {
            value = componentValue[expCfg.name];
        } else {  // 读取自身数据
            value = componentValue;
        }
        const matchValue = expCfg.matchValue;
        const matchValueFrom = expCfg.matchValueFrom;
        const matchValueTo = expCfg.matchValueTo;
        return {
            value,
            matchValue,
            matchValueFrom,
            matchValueTo
        };
    }


    public matchResolve(compareValue, expression) {
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
