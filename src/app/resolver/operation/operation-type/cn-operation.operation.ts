import { CnOperationBase } from '../cn-operation.base';
import { ICnOperation, ICnOperationModel } from '../cn-operation.interface';

export class CnOperationOprtn extends CnOperationBase implements ICnOperation {
    buildOperate(operationModel: ICnOperationModel) {
        const operation_options = {};
        operation_options['ajaxConfig'] = this.findAjaxConfig(
            operationModel.config.ajaxConfig,
            operationModel.config.cascade, 
            operationModel.triggerCfg.ajaxId
        );

        operation_options['beforeOperation'] = this.findBeforeOperationConfig(
            operationModel.config.beforeTrigger, 
            operationModel.triggerCfg.stateId
        );

        operation_options['condition'] = this.findConditionConfig(
            operationModel.config.condition, 
            operationModel.triggerCfg.conditionId
        );
        operation_options['data'] = operationModel.dataOfState;

        return operation_options;
    }

}