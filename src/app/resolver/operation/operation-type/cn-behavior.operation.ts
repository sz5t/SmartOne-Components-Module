import { ICnOperation, ICnOperationModel } from '../cn-operation.interface';
import { CnOperationBase } from '../cn-operation.base';

export class CnBehaviorOprtn extends CnOperationBase implements ICnOperation {
    buildOperate(operationModel: ICnOperationModel) {
        if (operationModel.dataOfState) {
            this.setDataState(operationModel.triggerCfg.trigger, operationModel.dataOfState);
            this.setToggle(operationModel.dataOfState);
        }
        const behavior_options = {};
        behavior_options['beforeOperation'] = this.findBeforeOperationConfig(
            operationModel.config.beforeTrigger, 
            operationModel.triggerCfg.stateId
        );

        behavior_options['condition'] = this.findConditionConfig(
            operationModel.config.condition, 
            operationModel.triggerCfg.conditionId
        );

        if (operationModel.triggerCfg.builtinId) {
            const _builtinConfig = this.findbuiltinConfig(
                operationModel.config.builtinConfig, 
                operationModel.triggerCfg.builtinId
            );
            _builtinConfig && (behavior_options['builtinConfig'] = _builtinConfig);
        }

        behavior_options['btnCfg'] = operationModel.sourceCfg;
        behavior_options['data'] = operationModel.dataOfState;
        
        return behavior_options;
    }

}