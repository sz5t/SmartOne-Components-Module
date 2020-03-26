import { COMPONENT_TYPES } from './../../resolver/component/cn-component.type';
import {
    Directive,
    OnInit,
    OnDestroy,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    Inject
} from "@angular/core";
import { ICnComponentBase } from "./base/cn-component-base.interface";
import { BSN_COMPONENT_SERVICES } from "src/app/core/relative-core";
import { ComponentProviderService } from "src/app/services/component/component-provider.service";
import { CnComponentResolver } from 'src/app/resolver/component/cn-component.resolver';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[CnComponentDirective]"
})
export class CnComponentDirective
    implements ICnComponentBase, OnInit, OnDestroy {
    @Input() config;
    @Input() initData;
    @Input() tempData;
    private _componentRef: ComponentRef<any>;

    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef,
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentProviderService
    ) {}

    ngOnInit(): void {
      const componentObj = new CnComponentResolver(this.componentService).resolve(this.config);
      if(componentObj) {
        this._buildComponent(componentObj)
      } else {
        // console.log(error);
      }
      
    }

    ngOnDestroy(): void {
        // throw new Error("Method not implemented.");
    }

    private _buildComponent(componentObj) {
        const comp = this._resolver.resolveComponentFactory<any>(
            COMPONENT_TYPES[componentObj.component]
        );

        this._componentRef = this._container.createComponent(comp);
        this._componentRef.instance.config = componentObj;
        this._componentRef.instance.initData = this.initData;
        this._componentRef.instance.tempData = this.tempData;
    }

    initComponent() {
        throw new Error("Method not implemented.");
    }
    initComponentData() {
        throw new Error("Method not implemented.");
    }
    initInnerData() {
        throw new Error("Method not implemented.");
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
}
