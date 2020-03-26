import { CnComponentSenderResolver } from './cn-component-sender.resolver';
import { ICnRelationResolver } from './../cn-relation.interface';
export class CnComponentInnerSenderResolver implements ICnRelationResolver {
    constructor(private _componentInstance){}
    /**
     * 
     * @param cfg {resultCfg, successData, isArrayResult = false}
     */
    resolve(cfg: any) {
        if (cfg.resultCfg.senderId) {
            const senderCfg = this._componentInstance
            .config
            .cascade
            .messageSender.find(sender => sender.id === cfg.resultCfg.senderId);

            if(senderCfg) {
                new CnComponentSenderResolver(this._componentInstance)
                .sendMessage(senderCfg, cfg.isArrayResult, cfg.successData);
            }
        }
    }

}