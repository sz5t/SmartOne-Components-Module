import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Input,
  Output,
  OnDestroy,
  Type,
  ViewChild,
  ElementRef,
  EventEmitter
} from "@angular/core";
import { CnComponentBase } from '../base/cn-component-base';
import { ComponentProviderService } from "src/app/services/component/component-provider.service";
import { BSN_COMPONENT_SERVICES } from 'src/app/core/relative-core';

@Component({
  selector: 'app-cn-charts',
  templateUrl: './cn-charts.component.html',
  styleUrls: ['./cn-charts.component.less']
})
export class CnChartsComponent extends CnComponentBase implements OnInit, OnDestroy, AfterViewInit {
  @Input() public config;
  @Input() public tempData;
  @Input() public initData;
  public layoutRowsCfg: any[];
  public chartObj: any = {};
  constructor(
  @Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentProviderService) {
      super(componentService);
   }

  public ngOnInit() {
    this.relationResolve(this);
    if (this.config.loadingOnInit) {
      this.layoutRowsCfg = this.config.chartLayout.rows.filter(r => r.id);
      this.config.formControls.forEach(Control => {
        this.chartObj[Control.id] = Control;
      });
    }
  }

  public ngAfterViewInit(){

  }

  public ngOnDestroy() {
    
  }

}
