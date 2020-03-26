import { CnComponentSenderResolver } from './cn-component-sender.resolver';
import { ICnRelationResolver } from './../cn-relation.interface';
export class CnComponentErrorSenderResolver implements ICnRelationResolver {
    constructor(private _componentInstance){}
    /**
     * 
     * @param cfg {errorCfg, errorData}
     */
    resolve(cfg: any) {
        if (cfg.errorCfg.senderId) {
            const senderCfg = this._componentInstance
            .config
            .cascade
            .messageSender.find(sender => sender.id === cfg.errorCfg.senderId);

            if(senderCfg) {
                new CnComponentSenderResolver(this._componentInstance)
                .sendErrorMessage(senderCfg, cfg.errorData);
            }
        }
    }

}