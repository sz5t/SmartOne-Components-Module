export interface ICnComponentBase {
    config: any;
    initData: any;
    tempData: any;
    initComponent();
    initComponentData();
    initInnerData();
    load();
    buildParameters(paramsCfg: any): any| any[];
    valueChange();
    setInitValue(val);
}