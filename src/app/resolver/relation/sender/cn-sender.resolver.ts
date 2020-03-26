import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';
import { ICnRelationResolver } from '../cn-relation.interface';
import { CnComponentSenderResolver } from './cn-component-sender.resolver';

/**
 * 消息发送器类
 */
export class CnSenderResolver implements ICnRelationResolver {
    constructor(private _componentInstance: any) { }
    public resolve(senderCfg) {
        const that = this;
        const sender_source$ = from(senderCfg);
        const sender_subscribe$ = sender_source$.pipe(map(cfg => {
            // 根据当前表格实例的类型,进行相应消息的注册
            new CnComponentSenderResolver(this._componentInstance).resolve(cfg);
        }));
        return sender_subscribe$;
    }
}