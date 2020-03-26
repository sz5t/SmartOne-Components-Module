export interface ICnOperation {
    buildOperate(operationModel: ICnOperationModel);
}

/**
 * 定义操作对象结构
 */
export interface ICnOperationModel {
    /**
     * 组件配置json
     */
    config?: any;
    /**
     * 触发源配置
     */
    sourceCfg?: any;
    /**
     * 触发器配置
     */
    triggerCfg?: any;
    /**
     * 目标视图 ID
     */
    targetViewId?: string;
    /**
     * 操作数据的状态对象
     */
    dataOfState?: any
}