import { CnComponentValidationSenderResolver } from '../../../resolver/relation/sender/cn-comppnent-validation-sender.resolver';
import { CnComponentInnerSenderResolver } from '../../../resolver/relation/sender/cn-component-inner-sender.resolver';
import { CnOperationResolver } from "../../../resolver/operation/cn-operation.resolver";
import {
    Component,
    OnInit,
    Inject,
    Input,
    Output,
    OnDestroy,
    Type,
    ViewChild,
    ElementRef,
    EventEmitter
} from "@angular/core";
import { CnTableBase } from "../base/cn-table.base";
import { BSN_COMPONENT_SERVICES } from "src/app/core/relative-core";
import { ComponentProviderService } from "src/app/services/component/component-provider.service";
import { ICnComponentBase } from "../base/cn-component-base.interface";
import {
    CN_DATA_TABLE_PROPERTY,
    ICnDataTableProperty
} from "./cn-data-table.property";
import { CN_DATA_TABLE_METHOD } from "./cn-data-table.method";
import { ICnDataTable } from "./cn-data-table.interface";
import { CommonUtils } from "src/app/core/utils/common-utils";
import { ICnOperationModel } from "src/app/resolver/operation/cn-operation.interface";
import { CN_TRIGGER_TYPE } from 'src/app/resolver/trigger/cn-trigger.interface';
import { CnParameterResolver } from 'src/app/resolver/parameter/cn-parameter.resolver';
import { CnComponentErrorSenderResolver } from 'src/app/resolver/relation/sender/cn-component-error-sender.resolver';
const components: { [type: string]: Type<any> } = {
    // form: CnDataFormComponent,
    // cfgLayoutPage: CfgLayoutPageComponent
    // label: ,
    // selectMultiple:,
    // datePicker:,
    // yearPicker:,
    // weekPicke:,
    // rangePicker:,
    // monthPicker:,
    // switch:,
    // radio:,
    // checkbox:,
    // treeSelect:,
    // transfer: ,
    // gridSelect:,
    // textarea: ,
    // customSelect: ,
};
@Component({
    selector: "cn-data-table",
    templateUrl: "./cn-data-table.component.html",
    styleUrls: ["./cn-data-table.component.less"]
})
export class CnDataTableComponent extends CnTableBase
    implements
        OnInit,
        OnDestroy,
        ICnDataTable,
        ICnComponentBase,
        ICnDataTableProperty {
    @Input()
    public config: any;
    @Input()
    public initData: any;
    @Input()
    public tempData: any;
    // @Output() public updateValue = new EventEmitter<any>();

    @ViewChild('text', {static: true}) text: ElementRef<any>;

    formCascade = {};

    // 表格状态数据缓存
    public ROWS_ADDED: any[] = [];
    public ROWS_EDITED: any[] = [];
    public ROW_SELECTED: any = {};
    public ROWS_CHECKED: any[] = [];

    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentProviderService
    ) {
        super(componentService);
        this.updateValue = new EventEmitter();
        this.cacheValue = this.componentService.cacheService;
    }

    //#region 组件生命周期

    ngOnInit() {
        // 组件内部属性及数据初始化
        
        this.initComponent();
        this.initInnerData();
        this.relationResolve(this);
        this.buildColumns(this.config.columns);
        if (this.config.loadingOnInit) {
            this.load();
        }
    }

    ngOnDestroy() {
        // 释放级联对象
        this.unsubscribeRelation();
        // 释放及联接受对象
        if (this.receiver_subscription$) {
            this.receiver_subscription$.unsubscribe();
        }

        if (this.sender_subscription$) {
            this.sender_subscription$.unsubscribe();
        }

        // 释放触发器对象
        if (this.trigger_receiver_subscription$) {
            this.trigger_receiver_subscription$.unsubscribe();
        }

        if (this.trigger_source$) {
            this.trigger_source$.unsubscribe();
        }

        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    //#endregion
    // ------------------------------------------------------------------------------------
    //#region 公共接口方法

    /**
     * 加载表格数据
     */
    public load() {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;

        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this.buildPaging(this.config),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            ...this.buildSort()
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService
            .getRequest(url, method, { params })
            .subscribe(
                response => {
                    if (
                        response &&
                        response.data &&
                        response.data.resultDatas
                    ) {
                        this.initComponentData();
                        response.data.resultDatas.map((d, index) => {
                            this.mapOfDataState[d[this.KEY_ID]] = {
                                disabled: false,
                                checked: false, // index === 0 ? true : false,
                                selected: false, // index === 0 ? true : false,
                                state: "text",
                                data: d,
                                originData: { ...d },
                                validation: true,
                                actions: this.getRowActions("text")
                            };
                            if (!this.config.isSelected) {
                                // tslint:disable-next-line: no-unused-expression
                                index === 0 && (this.ROW_SELECTED = d);
                            } else {
                                if (d[this.KEY_ID] === this.selectedRowValue) {
                                    this.ROW_SELECTED = d;
                                }
                            }
                        });

                        this.dataList = response.data.resultDatas;
                        this.total = response.data.count;
                        // 更新
                        // this.dataCheckedStatusChange();
                        // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
                        // this.dataList.length > 0 && this.setSelectRow(this.ROW_SELECTED);

                        this.setSelectRow(this.ROW_SELECTED);
                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }

    /**
     * 构建表格列
     * @param columnsCfg
     */
    public buildColumns(columnsCfg) {
        if (Array.isArray(columnsCfg) && columnsCfg.length > 0) {
            const colObjs = columnsCfg.filter(item => item.type === "field");
            const actionCfgs = columnsCfg.filter(
                item => item.type === "action"
            );
            if (actionCfgs && actionCfgs.length > 0) {
                actionCfgs.map(cfg => {
                    const colActions = [];
                    cfg.actionIds.map(actionId => {
                        const act = this.config.rowActions.find(
                            action => actionId === action.id
                        );
                        if (act) {
                            colActions.push(act);
                        }
                    });
                    if (colActions.length > 0) {
                        cfg["action"] = colActions;
                    }
                });
            }
             this.tableColumns = [];
            if (colObjs && colObjs.length > 0) {

                this.tableColumns.push(...colObjs);
            }
            if (actionCfgs && actionCfgs.length > 0) {
                this.tableColumns.push(...actionCfgs);
            }
        }
    }

    /**
     * 查询数据
     * @param reset 是否重置分页
     */
    public searchData(reset: boolean = false) {
        if (reset) {
            this.pageIndex = 1;
        }
        this.isAllChecked = false;
        this.indeterminate = false;
        this.load();
    }

    /**
     *
     */
    public addRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const newData = this.createNewRowData(this.config.columns);
        if (newData) {
            newData[this.KEY_ID] = newId;
            // 新增数据加入原始列表,才能够动态新增一行编辑数据
            this.dataList = [newData, ...this.dataList];

            // 组装状态数据
            this.mapOfDataState[newId] = {
                data: newData,
                originData: { ...newData },
                disabled: false,
                checked: true, // index === 0 ? true : false,
                selected: false, // index === 0 ? true : false,
                state: "new",
                actions: this.getRowActions("new")
            };

            this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

            this.dataCheckedStatusChange();
        }
    }

    /**
     *
     * @param option
     */
    public editRows(option) {
        this.ROWS_CHECKED.map(item => {
            this.changeRowToEditState(item);
            const trigger = new CnOperationResolver(this.componentService);
            const msgModel: ICnOperationModel = {
                config: this.config,
                triggerCfg: {
                    triggerType: CN_TRIGGER_TYPE.STATE,
                    trigger: CN_DATA_TABLE_METHOD.EDIT_ROW
                },
                targetViewId: this.config.id
            };
            trigger.sendMessage(msgModel);
            // const trigger = new ButtonOperationResolver(
            //   this.componentService,
            //   this.config,
            //   this.mapOfDataState[item[this.KEY_ID]]
            // );
            // trigger.sendBtnMessage(
            //   option.btnCfg,
            //   {
            //     triggerType: BSN_TRIGGER_TYPE.STATE,
            //     trigger: BSN_DATAGRID_TRIGGER.EDIT_ROW
            //   },
            //   this.config.id
            // );
        });
    }

    /**
     *
     * @param option
     */
    public editRow(option) {
        if (option.data) {
            this.changeRowToEditState(option.data.data);
        }
        return true;
    }

    /**
     *
     * @param option
     */
    public cancelAddedRow(option) {
        if (option.data) {
            this.removeNewRowData(option.data.data);
        }
        this.dataCheckedStatusChange();
    }

    /**
     *
     * @param option
     */
    public cancelAddedRows(option) {
        this.ROWS_ADDED.map(dataItem => {
            this.removeNewRowData(dataItem);
            const trigger = new CnOperationResolver(this.componentService);
            const msgModel: ICnOperationModel = {
                config: this.config,
                triggerCfg: {
                  triggerType: CN_TRIGGER_TYPE.STATE,
                  trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                },
                targetViewId: this.config.id
            };
            trigger.sendMessage(msgModel);
            // const trigger = new ButtonOperationResolver(
            //     this.componentService,
            //     this.config,
            //     this.mapOfDataState[item[this.KEY_ID]]
            // );
            // trigger.sendBtnMessage(
            //     option.btnCfg,
            //     {
                    
            //     },
            //     this.config.id
            // );
        });
        this.dataCheckedStatusChange();
        return true;
    }
    /**
     *
     * @param option
     */
    public cancelEditRows(option) {
        this.ROWS_CHECKED.map(item => {
            this.removeEditRowData(item);
            const trigger = new CnOperationResolver(this.componentService);
            const msgModel: ICnOperationModel = {
                config: this.config,
                triggerCfg: {
                  triggerType: CN_TRIGGER_TYPE.STATE,
                    trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                },
                targetViewId: this.config.id
            };
            trigger.sendMessage(msgModel);

            // const trigger = new ButtonOperationResolver( 
            //     this.componentService,
            //     this.config,
            //     this.mapOfDataState[item[this.KEY_ID]]
            // );
            // trigger.sendBtnMessage(
            //     option.btnCfg,
            //     {
                    
            //     },
            //     this.config.id
            // );
        });
        return true;
    }

    /**
     *
     * @param option
     */
    public cancelEditRow(option) {

        debugger;
        // this.removeEditRowData(option.data.data);
        if (option.data) {
            const itemId = option.data.data[this.KEY_ID];
            if (itemId) {
                this.ROWS_EDITED = this.ROWS_EDITED.filter(
                    r => r[this.KEY_ID] !== itemId
                );
            }
        }
        return true;
    }

    public changeAddedRowsToTextState(option) {
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {
                    this.ROWS_ADDED = this.ROWS_ADDED.filter(
                        r => r[this.KEY_ID] !== opt[this.KEY_ID]
                    );
                    this.mapOfDataState[opt[this.KEY_ID]]["originData"] = {
                        ...this.mapOfDataState[opt[this.KEY_ID]]["data"]
                    };
                    this.config.rowActions &&
                        (this.mapOfDataState[opt[this.KEY_ID]]["actions"] = [
                            ...this.config.rowActions.filter(
                                action => action.state === "text"
                            )
                        ]);

                    const trigger = new CnOperationResolver(this.componentService);
                    const msgModel: ICnOperationModel = {
                        config: this.config,
                        triggerCfg: {
                          triggerType: CN_TRIGGER_TYPE.STATE,
                          trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                        },
                        targetViewId: this.config.id
                    };
                    trigger.sendMessage(msgModel);

                    // const trigger = new ButtonOperationResolver(
                    //     this.componentService,
                    //     this.config,
                    //     this.mapOfDataState[opt[this.KEY_ID]]
                    // );
                    // trigger.sendBtnMessage(
                    //     {},
                    //     {
                            
                    //     },
                    //     this.config.id
                    // );
                }
            });
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.ROWS_ADDED = this.ROWS_ADDED.filter(
                r => r[this.KEY_ID] !== option[this.KEY_ID]
            );
            this.mapOfDataState[option[this.KEY_ID]]["originData"] = {
                ...this.mapOfDataState[option[this.KEY_ID]]["data"]
            };
            this.config.rowActions &&
                (this.mapOfDataState[option[this.KEY_ID]]["actions"] = [
                    ...this.config.rowActions.filter(
                        action => action.state === "text"
                    )
                ]);

            const trigger = new CnOperationResolver(this.componentService);
            const msgModel: ICnOperationModel = {
                // config: this.config,
                triggerCfg: {
                  triggerType: CN_TRIGGER_TYPE.STATE,
                  trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                },
                targetViewId: this.config.id
            };
            trigger.sendMessage(msgModel);
            // const trigger = new ButtonOperationResolver(
            //     this.componentService,
            //     this.config,
            //     this.mapOfDataState[option[this.KEY_ID]]
            // );
            // trigger.sendBtnMessage(
            //     {},
            //     {
            //         triggerType: CN_TRIGGER_TYPE.STATE,
            //         trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
            //     },
            //     this.config.id
            // );
        }
    }

    public changeEditedRowsToTextState(option) {
        debugger;
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {
                    this.mapOfDataState[opt[this.KEY_ID]]["originData"] = {
                        ...this.mapOfDataState[opt[this.KEY_ID]]["data"]
                    };

                    const trigger = new CnOperationResolver(this.componentService);
                    const msgModel: ICnOperationModel = {
                        // config: this.config,
                        triggerCfg: {
                          triggerType: CN_TRIGGER_TYPE.STATE,
                          trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                        },
                        targetViewId: this.config.id
                    };
                    trigger.sendMessage(msgModel);

                    // const trigger = new ButtonOperationResolver(
                    //     this.componentService,
                    //     this.config,
                    //     this.mapOfDataState[opt[this.KEY_ID]]
                    // );
                    // trigger.sendBtnMessage(
                    //     {},
                    //     {
                    //         triggerType: CN_TRIGGER_TYPE.STATE,
                    //         trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                    //     },
                    //     this.config.id
                    // );
                }
            });
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.mapOfDataState[option[this.KEY_ID]]["originData"] = {
                ...this.mapOfDataState[option[this.KEY_ID]]["data"]
            };

            const trigger = new CnOperationResolver(this.componentService);
            const msgModel: ICnOperationModel = {
                // config: this.config,
                triggerCfg: {
                  triggerType: CN_TRIGGER_TYPE.STATE,
                  trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
                },
                targetViewId: this.config.id
            };
            trigger.sendMessage(msgModel);
            // const trigger = new ButtonOperationResolver(
            //     this.componentService,
            //     this.config,
            //     this.mapOfDataState[option[this.KEY_ID]]
            // );
            // trigger.sendBtnMessage(
            //     {},
            //     {
            //         triggerType: CN_TRIGGER_TYPE.STATE,
            //         trigger: CN_DATA_TABLE_METHOD.CANCEL_EDIT_ROW
            //     },
            //     this.config.id
            // );
        }
    }

    public deleteCheckedRows(option) {
        console.log(this.config.id + "-------------executeSelectRow", option);
        if (option && option.ids) {
            option.ids.split(",").map(id => {
                this.dataList = this.dataList.filter(
                    d => d[this.KEY_ID] !== id
                );
            });
        }
        if (this.dataList.length > 0) {
            this.setSelectRow(this.dataList[0]);
        }
    }

    public async deleteCurrentRow(option) {
        console.log(this.config.id + "-------------executeSelectRow", option);

        // const url = option.ajaxConfig.url;
        // const method = option.ajaxConfig.ajaxType ? option.ajaxConfig.ajaxType : 'delete';
        // const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        // let paramData;
        // if (option.data) {
        //     paramData = CnParameterResolver.resolve({
        //         params: ajaxParams,
        //         item: option.data.data,
        //         tempValue: this.tempValue,
        //         initValue: this.initValue,
        //         cacheValue: this.cacheValue
        //     });
        // }
        // const response = await this.executeHttpRequest(url, method, paramData);
        // if (response) {
        //     this.load();
        // }
    }

    public async executeCurrentRow(option) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params
            ? option.ajaxConfig.params
            : [];
        let paramData;
        if (option.data) {
            paramData = CnParameterResolver.resolve({
                params: ajaxParams,
                item: option.data.data,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue
            });
        }
        const response = await this.executeHttpRequest(url, method, paramData);
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(
            response,
            option.ajaxConfig.result
        );

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(
            response,
            option.ajaxConfig.result
        );

        return validationResult && errorResult;
    }

    public async saveRow(option) {
        const ajaxConfig = option.ajaxConfig;
        const rowData = option.data.data;
        const url = ajaxConfig.url;
        const paramData = CnParameterResolver.resolve({
            params: ajaxConfig.params,
            tempValue: this.tempValue,
            componentValue: rowData,
            item: this.ROW_SELECTED,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue
        });

        const response = await this.componentService.apiService[
            ajaxConfig.ajaxType
        ](url, paramData).toPromise();

        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(
            response,
            ajaxConfig.result
        );

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(
            response,
            ajaxConfig.result
        );

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public async saveRows(option) {
        const ajaxConfig = option.ajaxConfig;
        // 构建业务对象
        // 执行异步操作
        const url = ajaxConfig.url;
        this.COMPONENT_VALUE = this._getComponentValueByHttpMethod(
            ajaxConfig.ajaxType
        );
        const paramsData = this.buildParameters(
            ajaxConfig.params,
            this.COMPONENT_VALUE,
            true
        );
        const response = await this.componentService.apiService[
            ajaxConfig.ajaxType
        ](url, paramsData).toPromise();
        // 批量提交数据,返回结果都将以数组的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(
            response,
            ajaxConfig.result
        );

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(
            response,
            ajaxConfig.result
        );

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

    public setSelectRow(rowData?, $event?) {
        if (!rowData) {
            return false;
        }
        if ($event) {
            const src = $event.srcElement || $event.target;
            if (src.type !== undefined) {
                return false;
            }
            $event.stopPropagation();
            $event.preventDefault();
        }

        this.ROW_SELECTED = rowData;

        // 选中当前行
        if (this.dataList.length > 0) {
            this.dataList.map(row => {
                this.mapOfDataState[row[this.KEY_ID]]["selected"] = false;
            });

            if (rowData[this.KEY_ID] && rowData[this.KEY_ID].length > 0) {
                this.mapOfDataState[rowData[this.KEY_ID]]["selected"] = true;
                this.mapOfDataState[rowData[this.KEY_ID]]["checked"] = !this
                    .mapOfDataState[rowData[this.KEY_ID]]["checked"];
            }

            // 勾选/取消当前行勾选状态

            this.dataCheckedStatusChange();
        }

        return true;
    }

    public clearSelectRow(type?) {
        this.dataList.map(row => {
            switch (type) {
                case "selected":
                    this.mapOfDataState[row[this.KEY_ID]]["selected"] = false;
                    break;
                case "checked":
                    this.mapOfDataState[row[this.KEY_ID]]["checked"] = false;
                    break;
                case "selectedOrchecked":
                    this.mapOfDataState[row[this.KEY_ID]]["selected"] = false;
                    this.mapOfDataState[row[this.KEY_ID]]["checked"] = false;
                    break;
                default:
                    this.mapOfDataState[row[this.KEY_ID]]["selected"] = false;
                    this.mapOfDataState[row[this.KEY_ID]]["checked"] = false;
                    break;
            }
        });
        this.dataCheckedStatusChange();
    }

    public selectRow(rowData) {
        console.log(this.config.id + "-----------" + rowData, arguments);
        // this.ROW_SELECTED = rowData;
    }

    /**
     *
     * @param newData
     */
    public refreshData(newData) {
        if (newData && Array.isArray(newData)) {
            newData.map((newDataItem, ind) => {
                const index = this.dataList.findIndex(
                    d => d[this.KEY_ID] === newDataItem[this.KEY_ID]
                );
                if (index > -1) {
                    this.dataList.splice(index, 1, newDataItem);
                    this.dataList = [...this.dataList];
                } else {
                    this.dataList = [newData[ind], ...this.dataList];
                }
                const mapData = this.mapOfDataState[newDataItem[this.KEY_ID]];
                if (mapData) {
                    mapData.state = "text";
                    mapData.actions = this.getRowActions("text");
                    mapData.data = newDataItem;
                    mapData.originData = { ...newDataItem };
                } else {
                    // 组装状态数据
                    this.mapOfDataState[newDataItem[this.KEY_ID]] = {
                        data: newDataItem,
                        originData: { ...newDataItem },
                        disabled: false,
                        checked: true, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: "text",
                        actions: this.getRowActions("text")
                    };
                }
            });
        }
    }

    /**
     *
     * @param option
     */
    public showInvalidateAddedRows(option) {
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]].validation = false;
            });
        } else if (option) {
            const rowData = option.data;
            this.mapOfDataState[rowData[this.KEY_ID]].validation = false;
        }
    }

    /**
     *
     * @param option
     */
    public showInvalidateEditedRows(option) {
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]].validation = false;
            });
        } else if (option) {
            const rowData = option.data;
            this.mapOfDataState[rowData[this.KEY_ID]].validation = false;
        }
    }

    /**
     *
     * @param option
     */
    public async executeSelectRow(option) {
        const ajaxParams = option.ajaxConfig.params
            ? option.ajaxConfig.params
            : [];
        const paramData = this.createSelectedRowParameter(ajaxParams);
        const result = await this.executeAjax(option, paramData);
        return result;
    }

    public async executeAjax(option, params) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;

        const response = await this.executeHttpRequest(
            url,
            method,
            params ? params : {}
        );
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(
            response,
            option.ajaxConfig.result
        );

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(
            response,
            option.ajaxConfig.result
        );

        return validationResult && errorResult;
    }

    /**
     *
     * @param option
     */
    public async executeCheckedRows(option) {
        const ajaxParams = option.ajaxConfig.params
            ? option.ajaxConfig.params
            : [];
        const paramData = this.createCheckedRowsParameter(ajaxParams);
        const result = await this.executeAjax(option, paramData);
        return result;
    }

    /**
     *
     * @param ajaxParams
     */
    private createSelectedRowParameter(ajaxParams) {
        return CnParameterResolver.resolve({
            params: ajaxParams,
            item: this.ROW_SELECTED,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue
        });
    }

    /**
     *
     * @param option
     */
    public async executeCheckedRowsIds(option) {
        const ajaxParams = option.ajaxConfig.params
            ? option.ajaxConfig.params
            : [];
        const paramData = this.createCheckedRowsIdParameter(ajaxParams);
        const result = await this.executeAjax(option, paramData);
        return result;
    }
    public export() {}

    public import() {}

    public download() {}

    /**
     * ACTION
     * 显示确认对话框
     * @param option 确认参数
     */
    public showConfirm(option: any) {
        this.confirm(option.dialog, () => {
            this.executeCurrentRow(option);
        });
    }

    /**
     * ACTION
     * @param option
     */
    public showCheckedItemsIdsConfirm(option: any) {
        this.confirm(option.dialog, () => {
            this.executeCheckedRowsIds(option);
        });
    }

    /**
     * ACTION
     * @param option
     */
    public showCheckedItems(option: any) {
        this.confirm(option.dialog, () => {
            this.executeCheckedRows(option);
        });
    }

    /**
     * 显示表单对话框
     * @param option 配置参数
     * dialog
     * changeValue
     * ajaxConfig
     */
    public showDialog(option: any) {
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.dialog;
        dialogCfg.form.state = option.btnCfg.state
            ? option.btnCfg.state
            : "text";

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }
        if (option.changeValue) {
            const d = CnParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue
            });
            option.changeValue.params.map(param => {
                if (param.type === "value") {
                    // 类型为value是不需要进行任何值的解析和变化
                } else {
                    if (d[param.name]) {
                        param["value"] = d[param.name];
                    }
                }
            });
        }

        const dialogOptional = {
            nzTitle: dialogCfg.title ? dialogCfg.title : "",
            nzWidth: dialogCfg.width ? dialogCfg.width : "600px",
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzContent: components[dialogCfg.form.type],
            nzComponentParams: {
                config: dialogCfg.form,
                changeValue: option.changeValue ? option.changeValue.params : []
            },
            nzFooter: [
                {
                    label: dialogCfg.cancelText
                        ? dialogCfg.cancelText
                        : "cancel",
                    onClick: componentInstance => {
                        dialog.close();
                    }
                },
                {
                    label: dialogCfg.okText ? dialogCfg.okText : "OK",
                    onClick: componentInstance => {
                        (async () => {
                            const response = await componentInstance.executeModal(
                                option
                            );
                            this._sendDataSuccessMessage(
                                response,
                                option.ajaxConfig.result
                            );

                            // 处理validation结果
                            this._sendDataValidationMessage(
                                response,
                                option.ajaxConfig.result
                            ) &&
                                this._sendDataErrorMessage(
                                    response,
                                    option.ajaxConfig.result
                                ) &&
                                dialog.close();
                        })();
                    }
                }
            ]
        };
        dialog = this.componentService.modalService.create(dialogOptional);
    }

    public showWindow() {}

    public showUpload() {}

    public showBatchDialog() {}

    public showMessage(option) {
        let msgObj;
        if (option && Array.isArray(option)) {
            // 后续需要根据具体情况解析批量处理结果
            msgObj = this.buildMessageContent(option[0]);
        } else if (option) {
            msgObj = this.buildMessageContent(option);
        }
        // tslint:disable-next-line: no-unused-expression
        option &&
            this.componentService.msgService.create(
                msgObj.type,
                `${msgObj.message}`
            );
    }

    //#region 对外接口
    public setInitValue(val) {
        this.initValue = { ...this.initValue, ...val };
    }
    //#endregion

    //#endregion
    // ------------------------------------------------------------------------------------
    //#region 组件内部功能

    /**
     * 表格属性初始化
     */
    initComponent() {
        this.COMPONENT_NAME = "CnDataTable";
        this.COMPONENT_PROPERTY = CN_DATA_TABLE_PROPERTY;
        this.COMPONENT_METHODS = CN_DATA_TABLE_METHOD;

        this.KEY_ID = this.config.keyId;
        this.pageSize = this.config.pageSize;
    }

    /**
     * 表格数据初始化
     */
    initComponentData() {
        this.mapOfDataState = {};
        this.ROWS_ADDED = [];
        this.ROWS_EDITED = [];
        this.ROW_SELECTED = [];
        this.ROWS_CHECKED = [];
        this.COMPONENT_VALUE = [];
        this.ROW_SELECTED = JSON.parse(`{"${this.KEY_ID}": ""}`);
    }

    /**
     * 表格内部变量初始化
     */
    initInnerData() {
        this.tempValue = {};
        this.initValue = {};
    }

    /**
     * 参数构建
     */
    buildParameters(paramsCfg, data?, isArray = false): any | any[] {
        let parameterResult: any | any[];
        if (!isArray && !data) {
            parameterResult = CnParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED
            });
        } else if (!isArray && data) {
            parameterResult = CnParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: data,
                editedRows: data,
                validation: data,
                returnValue: data
            });
        } else if (isArray && data && Array.isArray(data)) {
            parameterResult = [];
            data.map(d => {
                const param = CnParameterResolver.resolve({
                    params: paramsCfg,
                    tempValue: this.tempValue,
                    componentValue: d,
                    item: this.ROW_SELECTED,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    addedRows: d,
                    editedRows: d,
                    validation: d,
                    returnValue: d
                });
                parameterResult.push(param);
            });
        }
        return parameterResult;
    }

    /**
     * 列排序
     * @param $sort {key:string, value: string}
     */
    sort($sort: { key: string; value: string }): void {
        this.sortName = $sort.key;
        this.sortValue = $sort.value;
        this.load();
    }

    /**
     * 创建新行数据对象
     * @param columns
     */
    private createNewRowData(columns: any[]) {
        const newData: any = {};
        if (Array.isArray(columns) && columns.length > 0) {
            columns.map(col => {
                newData[col.field] = null;
            });
        }
        return newData;
    }

    /**
     *
     */
    private changeRowToEditState(row) {
        const index = this.ROWS_EDITED.findIndex(
            r => r[this.KEY_ID] === row[this.KEY_ID]
        );
        if (index < 0) {
            this.ROWS_EDITED = [row, ...this.ROWS_EDITED];
        }
    }

    /**
     *
     * @param row
     */
    private removeEditRowData(row) {
        this.ROWS_EDITED = this.ROWS_EDITED.filter(
            r => r[this.KEY_ID] !== row[this.KEY_ID]
        );
        this.dataCheckedStatusChange();
        return true;
    }

    private removeNewRowData(dataItem) {
        this.dataList = this.dataList.filter(
            r => r[this.KEY_ID] !== dataItem[this.KEY_ID]
        );
        this.ROWS_ADDED = this.ROWS_ADDED.filter(
            r => r[this.KEY_ID] !== dataItem[this.KEY_ID]
        );
        delete this.mapOfDataState[dataItem[this.KEY_ID]];
    }

    /**
     *
     * @param actionCfg 当前操作按钮的配置
     * @param rowData 当前数据行
     * @param $event
     */
    rowAction(actionCfg, rowData, $event?) {
        const dataOfState = this.mapOfDataState[rowData[this.KEY_ID]];
        $event && $event.stopPropagation();
        const trigger = new CnOperationResolver(this.componentService);
        const triggerModel: ICnOperationModel = {
            config: this.config,
            sourceCfg: actionCfg,
            targetViewId: this.config.id,
            'dataOfState': dataOfState
        };
        trigger.resolve(triggerModel);

        // const trigger = new ButtonOperationResolver(
        //     this.componentService,
        //     this.config,
        //     dataOfState
        // );
        // trigger.toolbarAction(actionCfg, this.config.id);
        $event && $event.preventDefault();
    }

    getRowActions(state): any[] {
        const orginAction = this.tableColumns.find(c => c.type === "action");
        const copyAction = [];
        if (orginAction) {
            const actions = JSON.parse(
                JSON.stringify(
                    this.tableColumns
                        .find(c => c.type === "action")
                        .action.filter(c => c.state === state)
                )
            );
            copyAction.push(...actions);
        }
        return copyAction;
    }

    private _getComponentValueByHttpMethod(method): any[] {
        switch (method) {
            case "post":
                return this.ROWS_ADDED;
            case "put":
                return this.ROWS_EDITED;
            case "proc":
                return [...this.ROWS_ADDED, ...this.ROWS_EDITED];
        }
    }

    private async executeHttpRequest(url, method, paramData) {
        return this.componentService.apiService[method](
            url,
            paramData
        ).toPromise();
    }

    private _sendDataSuccessMessage(response, resultCfg): boolean {
        let result = false;
        if (Array.isArray(response.data) && response.data.length <= 0) {
            return result;
        }
        if (response && response.data) {
            const successCfg = resultCfg.find(res => res.name === "data");
            // 弹出提示框
            if (successCfg) {
                const model = {
                  'resultCfg': successCfg,
                  'successData': response.data,
                  'isArrayResult': Array.isArray(response.data)
                };
                new CnComponentInnerSenderResolver(this).resolve(model);
            }
            result = true;
        }

        return result;
    }

    private _sendDataValidationMessage(response, resultCfg) {
        let result = true;
        if (
            response &&
            Array.isArray(response.validation) &&
            response.validation.length <= 0
        ) {
            return result;
        }
        if (response && response.validation) {
            const validationCfg = resultCfg.find(
                res => res.name === "validation"
            );
            if (validationCfg) {
              const model = {
                'validationCfg': validationCfg,
                'validationData': response.validation,
              };
                new CnComponentValidationSenderResolver(this).resolve(model);
            }
            result = false;
        }
        return result;
    }

    private _sendDataErrorMessage(response, resultCfg) {
        let result = true;
        if (
            response &&
            Array.isArray(response.error) &&
            response.error.length <= 0
        ) {
            return result;
        }
        if (response && response.error) {
            const errorCfg = resultCfg.find(res => res.name === "error");
            if (errorCfg) {
                const model = {
                  'errorCfg': errorCfg,
                  'errorData': response.error
                }
                new CnComponentErrorSenderResolver(this).resolve(model);
            }
            result = false;
        }
        return result;
    }

    /**
     *
     * @param ajaxParams
     */
    private createCheckedRowsParameter(ajaxParams) {
        const params = [];
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(cr => {
                const p = CnParameterResolver.resolve({
                    params: ajaxParams,
                    checkedItem: cr,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                params.push(p);
            });
        }
        return params;
    }

    /**
     *
     * @param ajaxParams
     */
    private createCheckedRowsIdParameter(ajaxParams) {
        const params = [];
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(cr => {
                const p = CnParameterResolver.resolve({
                    params: ajaxParams,
                    checkedItem: cr,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                params.push(p[this.KEY_ID]);
            });
        }
        return { ids: params.join(",") };
    }

    private buildMessageContent(msgObj) {
        const message: any = {};
        if (msgObj.code) {
            message.message = msgObj.code;
        } else if (msgObj.message) {
            message.message = msgObj.message;
        }
        // message.message = option.code ? option.code : '';
        msgObj.field && (message.field = msgObj.field ? msgObj.field : "");
        message.type = msgObj.type;
        return message;
    }

    /**
     * 全选
     */
    public checkAll($value: boolean): void {
        //
        this.dataList
            .filter(
                item => !this.mapOfDataState[item[this.KEY_ID]]["dislabled"]
            )
            .map(
                item =>
                    (this.mapOfDataState[item[this.KEY_ID]]["checked"] = $value)
            );
        this.dataCheckedStatusChange();
    }

    /**
     *
     */
    dataCheckedStatusChange() {
        if (this.dataList.length > 0) {
            this.isAllChecked = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
                .every(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);

            this.indeterminate = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
                .some(item => this.mapOfDataState[item[this.KEY_ID]]['checked']) && !this.isAllChecked;

            this.checkedNumber = this.dataList.filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']).length;

            // 更新当前选中数据集合
            this.ROWS_CHECKED = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
                .filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);
        } else {
            this.isAllChecked = false;
            this.indeterminate = false;
            this.checkedNumber = 0;

        }

        return true;
    }
    //#endregion

    /**
     * 表格数据变化级联方法
     */
    valueChange(v?) {
        console.log("行返回", v);
        this.mapOfDataState[v.id]["data"][v.name] = v.value;
        if (v["id"]) {
            if (!this.formCascade[v["id"]]) {
                this.formCascade[v["id"]] = {};
            }
            this.formCascade[v["id"]][v["name"]] = {};
        }

        const triggerKey = v.name;
        if (this.config.cascadeValue)
            this.config.cascadeValue.forEach(cascade => {
                if (cascade.name !== triggerKey) {
                    return true;
                }
                // console.log('==****开始应答解析*****==', cascade);
                cascade.CascadeObjects.forEach(cascadeObj => {
                    if (!this.formCascade[v["id"]][cascadeObj.cascadeName]) {
                        this.formCascade[v["id"]][cascadeObj.cascadeName] = {};
                    }
                    const cascadeResult = this.formCascade[v["id"]][
                        cascadeObj.cascadeName
                    ]; // 单个应答对象
                    cascadeResult[cascadeObj.cascadeName] = {};
                    cascadeObj.cascadeItems.forEach(item => {
                        // 满足前置条件、或者 类型是default
                        if (item.content.type === "ajax") {
                            const _cascadeValue = {};
                            item.content.data["option"].forEach(ajaxItem => {
                                if (ajaxItem["type"] === "value") {
                                    _cascadeValue[ajaxItem["name"]] =
                                        ajaxItem["value"];
                                }
                                if (ajaxItem["type"] === "selectValue") {
                                    // 选中行数据[这个是单值]
                                    _cascadeValue[ajaxItem["name"]] =
                                        v["value"];
                                }
                                if (ajaxItem["type"] === "selectObjectValue") {
                                    // 选中行对象数据
                                    if (v.dataItem) {
                                        _cascadeValue[ajaxItem["name"]] =
                                            v.dataItem[ajaxItem["valueName"]];
                                    }
                                }
                                // 其他取值【日后扩展部分】
                            });
                            if (
                                cascadeResult[
                                    cascadeObj.cascadeName
                                ].hasOwnProperty("cascadeValue")
                            ) {
                                cascadeResult[cascadeObj.cascadeName][
                                    "cascadeValue"
                                ] = {
                                    ...cascadeResult[cascadeObj.cascadeName][
                                        "cascadeValue"
                                    ],
                                    ..._cascadeValue
                                };
                            } else {
                                cascadeResult[cascadeObj.cascadeName][
                                    "cascadeValue"
                                ] = {
                                    ..._cascadeValue
                                };
                            }
                            cascadeResult[cascadeObj.cascadeName]["exec"] =
                                "ajax";
                            // this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
                        }
                        if (item.content.type === "setOptions") {
                            // 小组件静态数据集 , 目前静态数据，支持 多字段
                            const _cascadeOptions = item.content.data["option"];

                            if (
                                cascadeResult[
                                    cascadeObj.cascadeName
                                ].hasOwnProperty("cascadeOptions")
                            ) {
                                cascadeResult[cascadeObj.cascadeName][
                                    "cascadeOptions"
                                ] = _cascadeOptions;
                            } else {
                                cascadeResult[cascadeObj.cascadeName][
                                    "cascadeOptions"
                                ] = _cascadeOptions;
                            }
                            cascadeResult[cascadeObj.cascadeName]["exec"] =
                                "setOptions";
                            // this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
                        }
                        if (item.content.type === "setValue") {
                            let __setValue;
                            item.content.data["option"].forEach(ajaxItem => {
                                if (ajaxItem["type"] === "value") {
                                    __setValue = ajaxItem["value"];
                                }
                                if (ajaxItem["type"] === "selectValue") {
                                    // 选中行数据[这个是单值]
                                    __setValue = v["value"];
                                }
                                if (ajaxItem["type"] === "selectObjectValue") {
                                    // 选中行对象数据
                                    if (v.dataItem) {
                                        __setValue =
                                            v.dataItem[ajaxItem["valueName"]];
                                    }
                                }
                                // 其他取值【日后扩展部分】
                            });
                            // 赋值
                            // this.setValue(cascadeObj.cascadeName, __setValue);
                        }
                        if (item.content.type === "display") {
                            // 控制 小组件的显示、隐藏，由于组件不可控制，故而控制行列布局的显示隐藏
                        }
                        if (item.content.type === "message") {
                            // 某种操作后，或者返回后，弹出提示消息，可提示静态消息，可提示动态消息
                        }
                        if (item.content.type === "relation") {
                            // 当满足某种条件下，触发某种消息，消息值的组转，-》调用配置完善的消息结构
                            // 提供 消息配置名称，发送参数组合
                        }
                        if (item.content.type === "preventCascade") {
                            // 【大招】 某条件下，将级联阻止
                        }
                    });
                    this.formCascade[v["id"]][
                        cascadeObj.cascadeName
                    ] = JSON.parse(
                        JSON.stringify(
                            this.formCascade[v["id"]][cascadeObj.cascadeName]
                        )
                    );
                    // console.log('==树表内值变化反馈==', this.formCascade);
                });
            });
    }
}
