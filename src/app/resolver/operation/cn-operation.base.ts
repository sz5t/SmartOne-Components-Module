import { ComponentProviderService } from './../../services/component/component-provider.service';
import { CN_DATA_TABLE_TRIGGER } from '../trigger/trigger-const/cn-data-table.trigger';
import { CN_DATA_TABLE_METHOD } from 'src/app/components/base-components/cn-data-table/cn-data-table.method';
import { CN_TOOLBAR_TRIGGER } from '../trigger/trigger-const/cn-toolbar.trigger';
export class CnOperationBase {

    public findAjaxConfig(ajaxCfg, cascadeCfg, ajaxId) {
        let ajaxConfig;
        if (ajaxCfg && Array.isArray(ajaxCfg) && ajaxCfg.length > 0) {
            const c = ajaxCfg.find(cfg => cfg.id === ajaxId);
            if (c) {
                ajaxConfig = c;
                if (ajaxConfig.result) {
                    for (const r of ajaxConfig.result) {
                        // 查找结果对应的消息配置
                        if (cascadeCfg.messageSender) {
                            const senderConfig = cascadeCfg.messageSender.find(sender => sender.id === r.senderId);
                            if (senderConfig) {
                                r['senderCfg'] = senderConfig;
                            }
                        }
                    }
                }
            }
        }
        return ajaxConfig;
    }

    public findbuiltinConfig(builtinCfg, builtinId) {
        let builtinConfig;
        if (builtinCfg && Array.isArray(builtinCfg) && builtinCfg.length > 0) {
            const c = builtinCfg.filter(cfg => cfg.id === builtinId);
            if (c && c.length > 0) {
                builtinConfig = c[0];
            }
        }
        return builtinConfig;
    }


    public findBeforeOperationConfig(beforeTriggerCfg, stateId) {
        let beforeConfig;
        if (beforeTriggerCfg && Array.isArray(beforeTriggerCfg) && beforeTriggerCfg.length > 0) {
            const b = beforeTriggerCfg.filter(cfg => cfg.id === stateId);
            if (b && b.length > 0) {
                beforeConfig = b[0];
            }

        }
        return beforeConfig;
    }

    public findConditionConfig(conditionCfg, conditionId) {
        let conditionConfig;
        if (conditionCfg && Array.isArray(conditionCfg) && conditionCfg.length > 0) {
            const c = conditionCfg.filter(cfg => cfg.id === conditionId);
            if (c && c.length > 0) {
                conditionConfig = c[0];
            }
        }
        return conditionConfig;
    }

    public findConfirmConfig(dialogCfg, confirmId) {
        let confirmConfig;
        if (dialogCfg && Array.isArray(dialogCfg) && dialogCfg.length > 0) {
            const c = dialogCfg.find(cfg => cfg.id === confirmId);
            if (c) {
                confirmConfig = c;
            }
        }
        return confirmConfig;
    }

    public findChangeValueConfig(changeValueCfg, changeValueId) {
        let changeValueConfig;
        if (changeValueCfg && Array.isArray(changeValueCfg) && changeValueCfg.length > 0) {
            const c = changeValueCfg.find(cfg => cfg.id === changeValueId);
            if (c) {
                changeValueConfig = c;
            }
        }
        return changeValueConfig;
    }

    public setDataState(state, dataOfState) {
        switch (state) {
            case CN_DATA_TABLE_TRIGGER.EDIT_ROW:
                dataOfState.state = 'edit';
                // sendMsg.isSend = false;
                break;
            case CN_DATA_TABLE_METHOD.EDIT_ROWS:
                dataOfState.state = 'edit';
                // sendMsg.isSend = false;
                break;
            case CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                // sendMsg.isSend = true
                break;
            case CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROWS:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                // sendMsg.isSend = true
                break;
            case CN_DATA_TABLE_METHOD.ADD_ROW:
                dataOfState.state = 'new';
                dataOfState.validation = true;
                // sendMsg.isSend = true
                break;
            case CN_DATA_TABLE_METHOD.CANCEL_NEW_ROW:
                dataOfState.state = 'deleted';
                // sendMsg.isSend = true;
                break;
            case CN_DATA_TABLE_METHOD.CANCEL_NEW_ROWS:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                break;
            case CN_TOOLBAR_TRIGGER.STATE_TO_TEXT:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                break;
            case CN_TOOLBAR_TRIGGER.EXECUTE_NONE:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                break;
            case CN_DATA_TABLE_METHOD.REFRESH:
                dataOfState.state = 'text';
                dataOfState.validation = true;
                break;
        }
    }

    // 
    public setToggle(dataOfState) {
        if (Array.isArray(dataOfState.actions) && dataOfState.actions.length > 0) {
            // 状态切换
            // 查找当前数据对应的操作状态
            dataOfState.actions.map(action => {
                this.setToggleByState(action, dataOfState);
            })

        }
        // 根据data中的action数组,来判断如何如何显示按钮
        // 可用于结合数据状态判定按钮显示
        // 可用于结合切换类型判定按钮显示
    }

    public setToggleByState(action, dataOfState) {
        if (action.toggle && action.toggle.type) {
            switch (action.toggle.type) {
                case 'state':
                    const stateValue = dataOfState[action.toggle.type];
                    if (action.toggle.values) {
                        const valueObj = action.toggle.values.find(val => val.name === stateValue);
                        valueObj && (action[action.toggle.toggleProperty] = valueObj.value);
                    }

                    break;
                case '...':
                    break;
            }
        }
    }

    public setTogglePropertyValue() {

    }
}