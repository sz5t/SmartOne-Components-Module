import { CnComponentBase } from "./../base/cn-component-base";
import { Component, OnInit, Input } from "@angular/core";
import { ICnComponentBase } from "../base/cn-component-base.interface";

@Component({
    selector: "app-cn-page-header",
    templateUrl: "./cn-page-header.component.html",
    styleUrls: ["./cn-page-header.component.less"]
})
export class CnPageHeaderComponent implements OnInit, ICnComponentBase {
    @Input() config: any;
    @Input() initData: any;
    @Input() tempData: any;

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

    constructor() {}

    ngOnInit() {}
}
