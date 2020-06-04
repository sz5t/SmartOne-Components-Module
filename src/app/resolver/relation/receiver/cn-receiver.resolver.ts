import { ICnRelationResolver } from '../cn-relation.interface';
import { CnTriggerResolver } from '../../trigger/cn-trigger.resolver';

/**
 * 消息接收器类
 */
export class CnReceiverResolver implements ICnRelationResolver {
    constructor(private _componentInstance: any) { }
    public resolve(receiverCfg) {
        if (!this._componentInstance.subscription$) {
            this._componentInstance.subscription$ = this._componentInstance.componentService.commonRelationSubject.subscribe(
                data => {
                    receiverCfg.map(cfg => {
                        // 判断发送组件与接受组件是否一致
                        if (data.viewId === cfg.senderId) {
                            console.log('receiver data:', data);
                            // 判断发送触发器与接受触发起是否一致
                            // new TriggerResolver(
                            //     data,
                            //     this._componentInstance
                            // ).resolve();
                            this.chooseTrigger(data, cfg);
                        }
                    });

                }
            );
        }
    }
    private chooseTrigger(data, cfg) {
        if (cfg.receiveData && Array.isArray(cfg.receiveData) && cfg.receiveData.length > 0) {
            for (const c of cfg.receiveData) {
                // 解析并保存传递参数值当前组件
                // 触发组件相关的事件或者方法 
                if (data.trigger.triggerType === c.triggerType && data.trigger.trigger === c.trigger) {
                    if (Array.isArray(c.params) && c.params.length > 0) {
                        for (const p of c.params) {
                            switch (p.valueTo) {
                                case 'tempValue':
                                    this._componentInstance.tempValue[p.cname] = data.options[p.pname];
                                    break;
                                case 'initValue':
                                    this._componentInstance.initValue[p.cname] = data.options[p.pname];
                                    break;
                                case 'staticComponentValue':
                                    this._componentInstance.staticComponentValue[p.cname] = data.options[p.pname];
                                    break;
                                case 'outputValue':
                                    this._componentInstance.outputValue[p.cname] = data.options[p.pname];
                                    break;
                            }
                        }
                    }
                    new CnTriggerResolver(data, this._componentInstance).resolve();
                }
            }
        }
    }
}