import { CnTabsComponent } from './../cn-tabs/cn-tabs.component';
import { CnLayoutTabs } from './../../../resolver/layout/cn-tabs.layout';
import { CnDataTableComponent } from '../cn-data-table/cn-data-table.component';
import { CnLayoutComponent } from "./cn-layout.component";
import { ComponentProviderService } from "./../../../services/component/component-provider.service";
import { CnComponentBase } from "./../base/cn-component-base";
import {
    Directive,
    OnDestroy,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    Inject,
    Input,
    ComponentRef,
    Type
} from "@angular/core";
import { BSN_COMPONENT_SERVICES } from "src/app/core/relative-core";
import { ICnComponentBase } from "../base/cn-component-base.interface";
import { CnLayoutResolver } from "src/app/resolver/layout/cn-layout.resolver";
import { CnPageHeaderComponent } from "../cn-page-header/cn-page-header.component";
import { CnLayoutColumns } from "src/app/resolver/layout/cn-columns.layout";
import { CnLayoutRow } from "src/app/resolver/layout/cn-row.layout";
import { CN_LAYOUT_DIRECTIVE_RESOLVER_METHOD } from "./cn-layout.method";

const containerOfLayout: { [type: string]: Type<any> } = {
    layout: CnLayoutComponent,
    rows: CnLayoutComponent,
    cols: CnLayoutColumns,
    pageHeader: CnPageHeaderComponent
};

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[CnLayoutDirective]"
})
export class CnLayoutDirective extends CnComponentBase
    implements ICnComponentBase, OnInit, OnDestroy {
    @Input() config: any;
    @Input() initData: any;
    @Input() tempData: any;

    private _containerObj: ComponentRef<any>;
    public COMPONENT_METHODS = CN_LAYOUT_DIRECTIVE_RESOLVER_METHOD;
    public COMPONENT_PROPERTY = {};
    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef,
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentProviderService
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;
        this.initInnerData();
    }

    initComponent() {
        throw new Error("Method not implemented.");
    }

    initComponentData() {
        throw new Error("Method not implemented.");
    }

    initInnerData() {
        if (this.tempData) {
            this.tempValue = this.tempData;
        } else {
            this.tempValue = {};
        }
        if (this.initData) {
            this.initValue = this.initData;
        } else {
            this.initValue = {};
        }
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

    ngOnInit(): void {
        let configObj: any;
        if (this.config) {
            this.relationResolve(this);
            configObj = new CnLayoutResolver().resolve(this.config);
            if (configObj) {
                this.buildLayoutByContainer(configObj);
            } else {
                
                // console.log(error);
            }
        } else {
            // console.log(error);
        }
    }

    private buildLayoutByContainer(configObj: any) {
        const cmpt = this._resolver.resolveComponentFactory<any>(
            containerOfLayout[configObj.container]
        );
        this._container.clear();
        this._containerObj = this._container.createComponent(cmpt);
        this._containerObj.instance.config = configObj;
        if (this.tempValue) {
            this._containerObj.instance["tempData"] = this.tempData;
        }
        if (this.initValue) {
            this._containerObj.instance["initData"] = this.initData;
        }
    }

    public receiveMessage(data) {
        if (this._containerObj && this._containerObj.instance instanceof(CnTabsComponent)) {
            this._containerObj.instance["initData"] = this.initValue;
            this._containerObj.instance["tempData"] = this.tempValue;
            this._containerObj.instance.reloadTabContent();
            // this._tabObj.instance.tabsObj = CommonUtils.deepCopy(this._tabObj.instance.tabsObj);
        }
    }

    public tabActiveChangeByMapping(data) {
        if (this._containerObj && this._containerObj.instance instanceof(CnTabsComponent)) {
            this._containerObj.instance["initData"] = this.initValue;
            this._containerObj.instance["tempData"] = this.tempValue;
            this._containerObj.instance.setActiveByMapping(data);
            // this._tabObj.instance.tabsObj = CommonUtils.deepCopy(this._tabObj.instance.tabsObj);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeRelation();
    }
}
