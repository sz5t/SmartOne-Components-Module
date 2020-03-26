import { ICnOperation, ICnOperationModel } from './../cn-operation.interface';
import { CnOperationBase } from '../cn-operation.base';

export class CnLinkOprtn extends CnOperationBase implements ICnOperation {
    buildOperate(operationModel: ICnOperationModel) {
        const linkOptions = {};
        linkOptions['ajaxConfig'] = this.findAjaxConfig(
            operationModel.config.ajaxConfig,
            operationModel.config.cascade,
            operationModel.triggerCfg.ajaxId
        );
        linkOptions['beforeOperation'] = this.findBeforeOperationConfig(
            operationModel.config.beforeTrigger, 
            operationModel.triggerCfg.stateId
        );

        linkOptions['condition'] = this.findConditionConfig(
            operationModel.config.condition, 
            operationModel.triggerCfg.conditionId
        );

        return linkOptions;
    }

}