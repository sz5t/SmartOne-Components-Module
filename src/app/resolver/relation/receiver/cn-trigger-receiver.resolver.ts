import { ICnRelationResolver } from '../cn-relation.interface';
import { CnTriggerResolver } from '../../trigger/cn-trigger.resolver';

/**
 * 接收触发器发出的消息
 */
export class CnTriggerReceiverResolver implements ICnRelationResolver {
    constructor(private _componentInstance: any) { }
    public resolve() {
        const currentId = this._componentInstance.getCurrentComponentId(this._componentInstance.config);
        const trigger_subscribe$ = this._componentInstance.componentService.commonRelationTrigger.subscribe(
            data => {
                if (data.viewId === currentId) {
                    new CnTriggerResolver(
                        data,
                        this._componentInstance
                    ).resolve();
                }
            }
        )
        return trigger_subscribe$;
    }
}