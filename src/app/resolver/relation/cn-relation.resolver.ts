import { CnTriggerReceiverResolver } from './receiver/cn-trigger-receiver.resolver';
import { ICnRelationResolver } from './cn-relation.interface';
import { CnReceiverResolver } from './receiver/cn-receiver.resolver';
import { CnSenderResolver } from './sender/cn-sender.resolver';

export class CnRelationResolver implements ICnRelationResolver {
    constructor(private _componentInstance: any) {}
    resolve(cascadeCfg?: any) {
        let source$: any;
        if (cascadeCfg && cascadeCfg.messageSender) {
            source$ = this.resolveSender(cascadeCfg.messageSender);
        } else if (cascadeCfg && cascadeCfg.messageReceiver) {
            source$ = this.resolveReceiver(cascadeCfg.messageReceiver);
        } else {
            source$ = this.resolveTrigger();
        }
        return source$;
    }

    /**
     * 解析将要发送的消息
     * @param messageSenderCfg 配置消息发送的JSON对象
     */
    resolveSender(messageSenderCfg: any): any {
        // 组装操作判断条件
        messageSenderCfg.cascade.messageSender.map((sender: { sendData: any[]; }) => {
            sender.sendData.map((sendData: { conditionId: any; condition: any; beforeTriggerId: any; beforeOperation: any; }) => {
                // 操作判断
                if (sendData.conditionId) {
                    const condition = messageSenderCfg.condition.find((c: { id: any; }) => c.id === sendData.conditionId);
                    if (condition) {
                        sendData.condition = condition;
                    }
                }
                // 前置条件
                if (sendData.beforeTriggerId) {
                    const beforeOperation = messageSenderCfg.beforeTrigger.find((b: { id: any; }) => b.id === sendData.beforeTriggerId);
                    if (beforeOperation) {
                        sendData.beforeOperation = beforeOperation;
                    }
                }
            });
        });
        const resolver = new CnSenderResolver(this._componentInstance).resolve(messageSenderCfg.cascade.messageSender);
        return resolver;
    }

    /**
     * 解析将要接收消息
     * @param messageReceiverCfg 配置消息接收的JSON对象
     */
    resolveReceiver(messageReceiverCfg: any): any {
         // 查找前置条件
        const resolver = new CnReceiverResolver(this._componentInstance).resolve(messageReceiverCfg.cascade.messageReceiver);
        return resolver;
    }

    resolveTrigger() {
        return new CnTriggerReceiverResolver(this._componentInstance).resolve();
    }
}
