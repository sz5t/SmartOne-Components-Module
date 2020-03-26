import { EventEmitter } from 'events';
import {Subscription, Subject} from 'rxjs';
import { ComponentProviderService } from 'src/app/services/component/component-provider.service';
import { CnRelationResolver } from 'src/app/resolver/relation/cn-relation.resolver';
import { Output } from '@angular/core';
export class CnComponentBase {
    // #region 基本属性

    /**
     * 组件名称
     */
    private _COMPONENT_NAME;
    public get COMPONENT_NAME() {
        return this._COMPONENT_NAME;
    }
    public set COMPONENT_NAME(value) {
        this._COMPONENT_NAME = value;
    }

    /**
     * 组件所属属性
     */
    private _COMPONENT_PROPERTY;
    public get COMPONENT_PROPERTY() {
        return this._COMPONENT_PROPERTY;
    }
    public set COMPONENT_PROPERTY(value) {
        this._COMPONENT_PROPERTY = value;
    }

    /**
     * 组件所属方法
     */
    private _COMPONENT_METHODS;
    public get COMPONENT_METHODS() {
        return this._COMPONENT_METHODS;
    }
    public set COMPONENT_METHODS(value) {
        this._COMPONENT_METHODS = value;
    }

    /**
     * 组件值
     */
    private _COMPONENT_VALUE;
    public get COMPONENT_VALUE() {
        return this._COMPONENT_VALUE;
    }
    public set COMPONENT_VALUE(value) {
        this._COMPONENT_VALUE = value;
    }

    /**
     * 值变化事件
     */
    @Output()
    private _updateValue: any;
    public get updateValue(): any {
        return this._updateValue;
    }
    public set updateValue(value: any) {
        this._updateValue = value;
    }

    /**
     * 组件数据主键
     */
    private _KEY_ID: string;
    public get KEY_ID(): string {
        return this._KEY_ID;
    }
    public set KEY_ID(value: string) {
        this._KEY_ID = value;
    }

    /**
     * 临时变量
     */
    private _tempValue;
    public get tempValue() {
        return this._tempValue;
    }
    public set tempValue(value) {
        this._tempValue = value;
    }

    /**
     * 初始化值变量
     */
    private _initValue;
    public get initValue() {
        return this._initValue;
    }
    public set initValue(value) {
        this._initValue = value;
    }

    /**
     * 缓存值变量属性
     */
    private _cacheValue;
    public get cacheValue() {
        return this._cacheValue;
    }
    public set cacheValue(value) {
        this._cacheValue = value;
    }

    /**
     * 路由变量属性
     */
    private _routerValue;
    public get routerValue() {
        return this._routerValue;
    }
    public set routerValue(value) {
        this._routerValue = value;
    }

    /**
     * 级联值属性
     */
    private _cascadeValue;
    public get cascadeValue() {
        return this._cascadeValue;
    }
    public set cascadeValue(value) {
        this._cascadeValue = value;
    }

    /**
     * 静态组件值
     */
    private _staticComponentValue;
    public get staticComponentValue() {
        return this._staticComponentValue;
    }
    public set staticComponentValue(value) {
        this._staticComponentValue = value;
    }

    /**
     * 
     */
    private _subscription$: Subscription;
    public get subscription$(): Subscription {
        return this._subscription$;
    }
    public set subscription$(value: Subscription) {
        this._subscription$ = value;
    }

    /**
     * 
     */
    private _trigger_subscription$: Subscription;
    public get trigger_subscription$(): Subscription {
        return this._trigger_subscription$;
    }
    public set trigger_subscription$(value: Subscription) {
        this._trigger_subscription$ = value;
    }

    /**
     * 消息发送源对象
     */
    private _sender_source$: Subject<any>;
    public get sender_source$(): Subject<any> {
        return this._sender_source$;
    }
    public set sender_source$(value: Subject<any>) {
        this._sender_source$ = value;
    }

    /**
     * 事件消息发送源对象
     */
    private _trigger_source$: Subject<any>;
    public get trigger_source$(): Subject<any> {
        return this._trigger_source$;
    }
    public set trigger_source$(value: Subject<any>) {
        this._trigger_source$ = value;
    }

    /**
     * 消息接收者对象
     */
    private _receiver_subscription$: Subscription;
    public get receiver_subscription$(): Subscription {
        return this._receiver_subscription$;
    }
    public set receiver_subscription$(value: Subscription) {
        this._receiver_subscription$ = value;
    }

    /**
     * 发送者消息接收对象
     */
    private _sender_subscription$: Subscription;
    public get sender_subscription$(): Subscription {
        return this._sender_subscription$;
    }
    public set sender_subscription$(value: Subscription) {
        this._sender_subscription$ = value;
    }

    /**
     * 事件触发者消息接收对象
     */
    private _trigger_receiver_subscription$: Subscription;
    public get trigger_receiver_subscription$(): Subscription {
        return this._trigger_receiver_subscription$;
    }
    public set trigger_receiver_subscription$(value: Subscription) {
        this._trigger_receiver_subscription$ = value;
    }

    /**
     * 子组件列表
     */
    private _childComponents: any[];
    public get childComponents(): any[] {
        return this._childComponents;
    }
    public set childComponents(value: any[]) {
        this._childComponents = value;
    }

     // #endregion

    // #region 基本方法
    constructor(private _componentService: ComponentProviderService){}

    relationResolve(cmptInstance: any) {
        if (cmptInstance.config.cascade && cmptInstance.config.cascade.messageSender) {
            if (!this._sender_source$) {
                // 解析组件发送消息配置,并注册消息发送对象
                this._sender_source$ = new CnRelationResolver(cmptInstance).resolveSender(cmptInstance.config);
                this._sender_subscription$ = this._sender_source$.subscribe();
            }

        }
        if (cmptInstance.config.cascade && cmptInstance.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            // this._receiver_subscription$ = this._receiver_source$.subscribe();
            new CnRelationResolver(cmptInstance).resolveReceiver(cmptInstance.config);
        }

        this._trigger_source$ = new CnRelationResolver(cmptInstance).resolve();
    }
    /**
     * 释放消息相关资源，解除监听状态
     */
    unsubscribeRelation() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
        if (this.trigger_subscription$) {
            this.trigger_subscription$.unsubscribe();
        }
    }

    initComponentInnerValue(tempData, initData) {
        if (tempData) {
            this.tempValue = tempData;
        } else {
            this.tempValue = {};
        }
        if (initData) {
            this.initValue = initData;
        } else {
            this.initValue = {};
        }
    }

    getCurrentComponentId(config: any) {
        return config.id ? config.id : '';
    }

    public asyncBefore(target, method, advice) {
        const original = target[method];
        target[method] = (async (...args) => {
            const result = await advice(args);
            if (result) {
                original.apply(target, args);
            }
        });
        return target;
    }

    public asyncAfter(target, method, advice) {
        const original = target[method];
        target[method] = (async (...args) => {
            const result = await original.apply(target, args);
            if (result) {
                advice(args);
            }
        })
    }

    public before(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            const result = advice(args);
            if (result) {
                original.apply(target, args);
            }
        };
        return target;
    }

    public after(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            // tslint:disable-next-line: no-unused-expression
            original.apply(target, args) && advice(args);

        };
        return target;
    }

    public around(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            advice(args);
            original.apply(target, args);
            advice(args);
        };
        return target;
    }

    public confirm(confirmCfg, callback) {
        const confirmOptional = {
            nzTitle: confirmCfg.title ? confirmCfg.title : '',
            nzContent: confirmCfg.content ? confirmCfg.content : '',
            nzCancelText: confirmCfg.cancelText ? confirmCfg.cancelText : 'cancel',
            nzOkText: confirmCfg.okText ? confirmCfg.okText : 'OK',
            nzOnOk: () => {
                if (callback) {
                    callback();
                }
            }

        }
        this._componentService.modalService.confirm(confirmOptional);
    }

    public dialog(option) {
        console.log(option);

    }

    public createMessage() {
        const messageOptional = {}
        this._componentService.modalService.create(messageOptional);
    }

    //#endregion
}
