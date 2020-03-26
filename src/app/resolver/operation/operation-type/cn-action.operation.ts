import { CnOperationBase } from '../cn-operation.base';
import { CnRelativesMessageModel } from 'src/app/core/relative-core';
import { ICnOperation, ICnOperationModel } from '../cn-operation.interface';

export class CnActionOprtn extends CnOperationBase implements ICnOperation {
    public buildOperate(operationModel: ICnOperationModel) {
        const action_options = {};
        action_options['dialog'] = this.findConfirmConfig(
            operationModel.config.dialog, 
            operationModel.triggerCfg.dialogId
        );

        action_options['ajaxConfig'] = this.findAjaxConfig(
            operationModel.config.ajaxConfig,
            operationModel.config.cascade,
            operationModel.triggerCfg.ajaxId
        );

        action_options['conditionId'] = this.findConditionConfig(
            operationModel.config.condition, 
            operationModel.triggerCfg.conditionId
        );

        action_options['changeValue'] = this.findChangeValueConfig(
            operationModel.config.changeValue, 
            operationModel.triggerCfg.changeValueId
        );

        action_options['data'] = operationModel.dataOfState;
        action_options['btnCfg'] = operationModel.sourceCfg;
        
        return action_options;
    }
}