import { CnOperationBase } from './../cn-operation.base';
import { ICnOperation, ICnOperationModel } from '../cn-operation.interface';
export class CnStateOprtn extends CnOperationBase implements ICnOperation {
    buildOperate(operationModel: ICnOperationModel) {
        if (operationModel.dataOfState) {
            this.setDataState(operationModel.triggerCfg.trigger, operationModel.dataOfState);
            this.setToggle(operationModel.dataOfState);
        }
        const state_options = {};
        
        if(operationModel.triggerCfg.stateId) {
            state_options['beforeOperation'] = 
            this.findBeforeOperationConfig(
                operationModel.config.beforeTrigger, 
                operationModel.triggerCfg.stateId
            );
        }
        
        if(operationModel.triggerCfg.conditionId) {
            state_options['condition'] = this.findConditionConfig(
                operationModel.config.condition, 
                operationModel.triggerCfg.conditionId
            );
        }

        

        if (operationModel.triggerCfg.builtinId) {
            const _builtinConfig = this.findbuiltinConfig(
                operationModel.config.builtinConfig, 
                operationModel.triggerCfg.builtinId
            );
            _builtinConfig && (state_options['builtinConfig'] = _builtinConfig);
        }

        state_options['btnCfg'] = operationModel.sourceCfg;
        state_options['data'] = operationModel.dataOfState;
        return state_options;
        
    }

}