import { ComponentProviderService } from './../../../services/component/component-provider.service';
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Inject} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { ICnComponentBase } from "../base/cn-component-base.interface";
import { CnComponentBase } from '../base/cn-component-base';
import { BSN_COMPONENT_SERVICES } from 'src/app/core/relative-core';
import { CnRelationResolver } from 'src/app/resolver/relation/cn-relation.resolver';
import { CnOperationResolver } from 'src/app/resolver/operation/cn-operation.resolver';
import { ICnOperationModel } from 'src/app/resolver/operation/cn-operation.interface';
import { CN_TOOLBAR_METHOD } from './cn-toolbar.method';

@Component({
    selector: "cn-toolbar",
    templateUrl: "./cn-toolbar.component.html",
    styles: [
        `
            .table-operations {
                padding-top: 3px;
                padding-bottom: 3px;
            }

            .table-operations .ant-btn-group {
                margin-right: 4px;
                margin-bottom: 2px;
                font-weight: 600;
            }
        `
    ]
})
export class CnToolbarComponent extends CnComponentBase
    implements OnInit, OnDestroy, ICnComponentBase {
    initData: any;
    tempData: any;
    @Input()
    public config;
    @Input()
    public size;
    @Input()
    public permissions = [];
    @Input()
    public viewId;
    public toolbarConfig = [];
    public model;
    public _cascadeState;
    public toolbars;
    public toolbarsIsLoading = [];


    // public _receiver_subscription$: Subscription;
    // private _sender_subscription$: Subscription;
    // private _trigger_receiver_subscription$: Subscription;

    public COMPONENT_METHODS = CN_TOOLBAR_METHOD;
    // public COMPONENT_PROPERTIES =

    public OPREATION_DATA: any | any[];

    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentProviderService
    ) {
        super(componentService);
    }

    public ngOnInit() {
        this.toolbarConfig = this.config.toolbar;
        this.initInnerData();

        this.relationResolve(this);
        // if (this.config.cascade && this.config.cascade.messageReceiver) {
        //     // 解析消息接受配置,并注册消息接收对象
        //     // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
        //     // this._receiver_source$.subscribe();
        //     new CnRelationResolver(this).resolveReceiver(this.config);
        // }
    }

    initComponent() {
        throw new Error("Method not implemented.");
    }
    initComponentData() {
        
    }
    initInnerData() {
      this.tempValue = {};
      this.initValue = {};
    }
    load() {
        throw new Error("Method not implemented.");
    }
    buildParameters(paramsCfg: any) {
        throw new Error("Method not implemented.");
    }
    valueChange() {
        throw new Error("Method not implemented.");
    }
    setInitValue(val: any) {
        throw new Error("Method not implemented.");
    }

    public getPermissions() {
        const permissionMap = new Map();
        this.permissions.forEach(item => {
            permissionMap.set(item.code, item);
        });
        if (this.toolbars && Array.isArray(this.toolbars)) {
            this.toolbars.forEach(item => {
                if (item.group) {
                    const groups = [];
                    item.group.forEach(g => {
                        const Loading = {};
                        Loading[g.name] = false;
                        this.toolbarsIsLoading.push(Loading);
                        if (permissionMap.has(g.name)) {
                            groups.push({ ...g });
                        } else if (g.cancelPermission) {
                            groups.push({ ...g });
                        }
                    });

                    this.toolbarConfig.push({ group: groups });
                } else if (item.dropdown) {
                    const dropdown = [];
                    item.dropdown.forEach(b => {
                        let is_dropdown = true;
                        if (permissionMap.has(b.name)) {
                            is_dropdown = false;
                        } else if (b.cancelPermission) {
                            is_dropdown = false;
                        }
                        if (is_dropdown) {
                            return true;
                        }
                        const down: any = {};
                        const { name, text, icon } = b;
                        down.name = name;
                        down.text = text;
                        down.icon = icon;
                        down.buttons = [];
                        b.buttons.forEach(btn => {
                            //  const Loading = {};
                            //  Loading[btn.name] = false;
                            //  this.toolbarsisLoading.push(Loading);
                            if (permissionMap.has(btn.name)) {
                                down.buttons.push({ ...btn });
                            } else if (btn.cancelPermission) {
                                down.buttons.push({ ...btn });
                            }
                        });
                        dropdown.push(down);
                    });
                    this.toolbarConfig.push({ dropdown });
                }
            });
        }
    }

    private checkComponentProperty(btn) {
        const checkResult = [];
        const allCheckResult = [];
        for (const exps of btn.beforeExecute) {
            const valueName = exps.valueName;
            for (const exp of exps.expression) {
                switch (exp.type) {
                    case "property":
                        const valueCompareObj = this.buildMatchObject(
                            this.OPREATION_DATA[valueName],
                            exp
                        );
                        const valueMatchResult = this.matchResolve(
                            valueCompareObj,
                            exp.match
                        );
                        allCheckResult.push(valueMatchResult);
                        break;
                    case "element":
                        const elementResult = [];
                        for (const element of this.OPREATION_DATA[valueName]) {
                            const elementCompareObj = this.buildMatchObject(
                                element,
                                exp
                            );
                            elementResult.push(
                                this.matchResolve(elementCompareObj, exp.match)
                            );
                        }
                        const elementMatchResult =
                            elementResult.findIndex(res => !res) < 0;
                        allCheckResult.push(elementMatchResult);
                }
            }
            checkResult.push(allCheckResult.findIndex(res => !res) < 0);
        }
        return checkResult.findIndex(res => !res) < 0;
    }

    public action(btn, targetViewId) {
        setTimeout(_ => {
            this.toolbarsIsLoading[btn.id] = false;
        }, 150);

        if (Array.isArray(btn.beforeExecute) && btn.beforeExecute.length > 0) {
            const res = this.checkComponentProperty(btn);
            if (!res) {
                return false;
            }
        }
        // 判断当前按钮操作,是否需要提前准备操作数据
        // isHandleData属性标识当前按钮是否协同数据一起操作
        // debugger;
        // if (btn.isHandleData && Array.isArray(btn.execute.params) && btn.execute.params.length > 0) {

        //     // 获取initValue或者tempValue内的数据,判断是否存在可编辑的数据对象或者集合
        //     // 如果存在则可继续执行,如果不存在则无法继续执行
        //     btn.execute.params.forEach(param => {
        //         const paramObj = this.tempValue[param['name']];
        //         if (paramObj && Array.isArray(paramObj) && paramObj.length === 0) {
        //             isContinue = false;
        //         } else if (!paramObj) {
        //             isContinue = false;
        //         }
        //     });
        //     if (!isContinue) {
        //         return false;
        //     }
        // }

        if (!this.toolbarsIsLoading[btn.id]) {
            // 根据触发类型发送不同类型的具体消息内容
            // const btn_source$ = from(btn.execute);
            // btn_source$.pipe(map(exeCfg => this.sendBtnMessage(exeCfg, targetViewId))).subscribe().unsubscribe();
            const actions = this.toolbarConfig.find(
                t => t.targetViewId === targetViewId
            );
            const dataOfState = { state: btn.state, actions: actions.group };
            if (btn.toggle && btn.toggle.type) {
                switch (btn.toggle.type) {
                    case "state":
                        const stateValue = dataOfState[btn.toggle.type];
                        if (btn.toggle.values) {
                            const valueObj = btn.toggle.values.find(
                                val => val.name === stateValue
                            );
                            valueObj &&
                                (btn[btn.toggle.toggleProperty] =
                                    valueObj.value);
                        }

                        break;
                    case "...":
                        break;
                }
            }
            debugger;
            const btnResolver = new CnOperationResolver(this.componentService);
            const model: ICnOperationModel = {
              'config': this.config,
              'dataOfState': dataOfState,
              'sourceCfg': btn,
              'targetViewId': targetViewId
            }
            btnResolver.resolve(model);
            this.toolbarsIsLoading[btn.id] = true;
        }
    }

    public setOperationData(option) {
        console.log("toolbar -setOperation tempValue", this.tempValue, option);
        this.OPREATION_DATA = option;
    }

    public stateToText(option) {
        const actions = this.toolbarConfig.find(
            t => t.targetViewId === option.targetViewId
        );
        const dataOfState = { state: "text", actions: actions.group };
        const btn = {
          execute: [{ trigger: "EXECUTE_NONE", triggerType: "STATE" }]
        };
        const btnResolver = new CnOperationResolver(this.componentService);
        const model: ICnOperationModel = {
          'config': this.config,
          'dataOfState': dataOfState,
          'sourceCfg': btn,
          'targetViewId': option.targetViewId
        }
        btnResolver.resolve(model);
        // const btnResolver = new ButtonOperationResolver(
        //     this.componentService,
        //     this.config,
        //     dataOfState
        // );
        
        // btnResolver.resolve(model);
    }

    public stateToEdit(option) {
        const actions = this.toolbarConfig.find(
            t => t.targetViewId === option.targetViewId
        );
        const dataOfState = { state: "edit", actions: actions.group };
        const btn = {
          execute: [{ trigger: "EXECUTE_NONE_EDIT", triggerType: "STATE" }]
      };
        const btnResolver = new CnOperationResolver(this.componentService);
        const model: ICnOperationModel = {
          'config': this.config,
          'dataOfState': dataOfState,
          'sourceCfg': btn,
          'targetViewId': option.targetViewId
        }
        btnResolver.resolve(model);
        
        // const btnResolver = new ButtonOperationResolver(
        //     this.componentService,
        //     this.config,
        //     dataOfState
        // );
        
        // btnResolver.toolbarAction(btn, option.targetViewId);
    }

    public executeNone() {}

    public executeNoneEdit() {}

    public ngOnDestroy() {
        this.unsubscribeRelation();
    }

    private buildMatchObject(componentValue, expCfg) {
        let value;
        if (expCfg.name) {
            value = componentValue[expCfg.name];
        } else {
            // 读取自身数据
            value = componentValue;
        }
        const matchValue = expCfg.matchValue;
        const matchValueFrom = expCfg.matchValueFrom;
        const matchValueTo = expCfg.matchValueTo;
        return {
            'value': value,
            'matchValue': matchValue,
            'matchValueFrom': matchValueFrom,
            'matchValueTo': matchValueTo
        };
    }

    private matchResolve(compareValue, expression) {
        switch (expression) {
            case "eq": // =
                return compareValue.value === compareValue.matchValue;
            case "neq": // !=
                return compareValue.value !== compareValue.matchValue;
            case "ctn": // like
                return compareValue.matchValue.indexOf(compareValue.value) > 0;
            case "nctn": // not like
                return compareValue.matchValue.indexOf(compareValue.value) <= 0;
            case "in": // in  如果是input 是这样取值，其他则是多选取值
                let in_result = true;
                if (
                    Array.isArray(compareValue.matchValue) &&
                    compareValue.matchValue.length > 0
                ) {
                    in_result =
                        compareValue.matchValue.findIndex(compareValue.value) >
                        0;
                }
                return in_result;
            case "nin": // not in  如果是input 是这样取值，其他则是多选取值
                let nin_result = true;
                if (
                    Array.isArray(compareValue.matchValue) &&
                    compareValue.matchValue.length > 0
                ) {
                    nin_result =
                        compareValue.matchValue.findIndex(compareValue.value) <=
                        0;
                }
                return nin_result;
            case "btn": // between
                return (
                    compareValue.matchValueFrom <= compareValue.value &&
                    compareValue.matchValueTo >= compareValue.value
                );
            case "ge": // >=
                return compareValue.value >= compareValue.matchValue;
            case "gt": // >
                return compareValue.value > compareValue.matchValue;
            case "le": // <=
                return compareValue.value <= compareValue.matchValue;
            case "lt": // <
                return compareValue.value < compareValue.matchValue;
            default:
            case "regexp": // 正在表达式匹配
                const regexp = new RegExp(compareValue.matchValue);
                return regexp.test(compareValue.value);
        }
    }
}
