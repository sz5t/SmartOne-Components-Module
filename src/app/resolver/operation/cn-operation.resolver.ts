import { CnStateOprtn } from './operation-type/cn-state.operation';
import { ICnOperationModel } from './cn-operation.interface';
import { ComponentProviderService } from './../../services/component/component-provider.service';
import { CnRelativesMessageModel } from 'src/app/core/relative-core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CnActionOprtn } from './operation-type/cn-action.operation';
import { CnOperationOprtn } from './operation-type/cn-operation.operation';
import { CnBehaviorOprtn } from './operation-type/cn-behavior.operation';
import { CnLinkOprtn } from './operation-type/cn-link.operation';

export class CnOperationResolver {
    private TRIGGER_TYPE_FUNCS: { [type: string]: any } = {
        'STATE': (model) => {
            return new CnStateOprtn().buildOperate(model);
        },
        'OPERATION': (model) => {
            return new CnOperationOprtn().buildOperate(model);
        },
        'ACTION': (model) => {
            return new CnActionOprtn().buildOperate(model);
        },
        'BEHAVIOR': (model) => {
            return new CnBehaviorOprtn().buildOperate(model);
        },
        'LINK': (model) => {
            return new CnLinkOprtn().buildOperate(model);
        }

    }
    constructor(private componentService: ComponentProviderService) {}
    resolve(operationModel: ICnOperationModel) {
        const btn_source$ = from(operationModel.sourceCfg.execute);
        btn_source$.pipe(
            map(triggerCfg => {
                operationModel.triggerCfg = triggerCfg;
                this.sendMessage(operationModel);
            })
        ).subscribe().unsubscribe();
    }

    sendMessage(operationModel: ICnOperationModel) {
        const triggerObj = {
            triggerType: operationModel.triggerCfg.triggerType,
            trigger: operationModel.triggerCfg.trigger
        }
        const options = this.TRIGGER_TYPE_FUNCS[operationModel.triggerCfg.triggerType](operationModel);
        // const options = this[operationModel.triggerCfg.triggerType](operationModel)
        const msg = new CnRelativesMessageModel(
            triggerObj,
            operationModel.targetViewId,
            options
        );
        this.componentService.commonRelationTrigger.next(msg);
    }

    
    state(operationModel: ICnOperationModel) {
        return new CnStateOprtn().buildOperate(operationModel);
    }

    operation(operationModel: ICnOperationModel) {
        return new CnOperationOprtn().buildOperate(operationModel);
    }

    action(operationModel: ICnOperationModel) {
        return new CnActionOprtn().buildOperate(operationModel);
    }

    behavior(operationModel: ICnOperationModel) {
        return new CnBehaviorOprtn().buildOperate(operationModel);
    }

    link(operationModel: ICnOperationModel) {
        return new CnLinkOprtn().buildOperate(operationModel);
    }

    
}