import { CnComponentSenderResolver } from './cn-component-sender.resolver';
import { ICnRelationResolver } from './../cn-relation.interface';
export class CnComponentValidationSenderResolver implements ICnRelationResolver {
    constructor(private _componentInstance){}
    /**
     * 
     * @param cfg {validationCfg, validationData}
     */
    resolve(cfg: any) {
        if (cfg.validationCfg.senderId) {
            const senderCfg = this._componentInstance
            .config
            .cascade
            .messageSender.find(sender => sender.id === cfg.validationCfg.senderId);

            if(senderCfg) {
                new CnComponentSenderResolver(this._componentInstance)
                .sendValidationMessage(senderCfg, cfg.validationData);
            }
        }
    }

}