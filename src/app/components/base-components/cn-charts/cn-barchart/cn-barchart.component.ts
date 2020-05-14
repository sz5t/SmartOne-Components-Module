import { CnComponentValidationSenderResolver } from '../../../../resolver/relation/sender/cn-comppnent-validation-sender.resolver';
import { CnComponentInnerSenderResolver } from '../../../../resolver/relation/sender/cn-component-inner-sender.resolver';
import { CnOperationResolver } from "../../../../resolver/operation/cn-operation.resolver";
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
import { CnComponentBase } from '../../base/cn-component-base';
import { BSN_COMPONENT_SERVICES } from "src/app/core/relative-core";
import { ComponentProviderService } from "src/app/services/component/component-provider.service";
import { ICnComponentBase } from "../../base/cn-component-base.interface";
import { CommonUtils } from "src/app/core/utils/common-utils";
import { ICnOperationModel } from "src/app/resolver/operation/cn-operation.interface";
import { CN_TRIGGER_TYPE } from 'src/app/resolver/trigger/cn-trigger.interface';
import { CnParameterResolver } from 'src/app/resolver/parameter/cn-parameter.resolver';
import { CnComponentErrorSenderResolver } from 'src/app/resolver/relation/sender/cn-component-error-sender.resolver';

@Component({
  selector: 'app-cn-barchart',
  templateUrl: './cn-barchart.component.html',
  styles: [`
  .g2-label-item {
        font-size: 10px;
        text-align: center;
    }

    .g2-label-item-value {
        color: #595959;
    }

    .g2-label-item-percent {
        color: #8c8c8c
    }}
`]
})
export class CnBarchartComponent extends CnComponentBase
implements OnInit, AfterViewInit, OnDestroy {
@Input() public config; // 配置参数
@Input() public permissions = [];
@Input() public dataList = []; // 表格数据集合
@Input() public initData;
@Input() public casadeData; // 级联配置 liu 20181023
@Input() public value;
@Input() public bsnData;
@Input() public ref;
@Input() tempData;
public KEY_ID: string;
public originDv;
public showdata = []; // 展示的数组
public showguide = []; // 辅助线的数组
public guidedataList = []; // 辅助线的数据集合
public ds; // 读取的全部数据
public dv; // 根据要求过滤出的视图
public datalength; // 真实的数据长度
public Shape; // 自定义样式效果
public test = []; // 辅助线的图例数组
// tempValue = {};
@Output() public updateValue = new EventEmitter();
@ViewChild('container', { static: false }) public chartElement: ElementRef;
public chart;
public cascadeValue: any;
constructor(
  @Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentProviderService
) {
  super(componentService);
  this.updateValue = new EventEmitter();
  this.cacheValue = this.componentService.cacheService;
}

public ngOnInit() {
  // 设置数据操作主键
  this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';

  this._initInnerValue();
  this.resolveRelations();
  // this.dataList = [
  //   { name: '张伟', value: 95, percent: 'aaa' },
  //   { name: '王秀英', value: 94, percent: 'aaa' },
  //   { name: '李明', value: 92, percent: 'aaa' },
  //   { name: '王丽', value: 89, percent: 'aaa' },
  //   { name: '刘洋', value: 80, percent: 'aaa' },
  //   { name: '何勇', value: 80, percent: 'aaa' },
  //   { name: '王强', value: 78, percent: 'bbb' },
  //   { name: '林杰', value: 76, percent: 'bbb' },
  //   { name: '李桂英', value: 75, percent: 'bbb' },
  //   { name: '何秀兰', value: 73, percent: 'bbb' },
  //   { name: '卢芳', value: 68, percent: 'bbb' },
  //   { name: '张德', value: 61, percent: 'bbb' }
  // ];
}

private _initInnerValue() {
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

public ngAfterViewInit() {
  if (this.config.loadingOnInit) {
    setTimeout(() => {
      this.load();
    }, 0);
  }

}
public ngAfterContentInit() {

}

public async load() {

  await this.load_data();
  if (this.chart) {
    this.chart.destroy();
  }
  this.CreateChart_Bar();
}

/**
 * CreateChart_Bar  生成柱状图
 */
public CreateChart_Bar() {
  this.chart = new G2.Chart({
    container: this.chartElement.nativeElement, // 指定图表容器 ID
    animate: true, // 动画 默认true
    forceFit: true,  // 图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
    // width: 600,  // 当 forceFit: true  时宽度配置不生效
    height: this.config.chartConfig.BasiAttribute.height ? this.config.chartConfig.BasiAttribute.height : 300, // 指定图表高度
    padding: 'auto'
  });
  this.chart.source(this.dataList);
  if (this.config.chartConfig.BasiAttribute.x.scale) {
    this.chart.scale(this.config.chartConfig.BasiAttribute.x.name, this.config.chartConfig.BasiAttribute.x.scale);
  }
  if (this.config.chartConfig.BasiAttribute.x.axis) {
    this.chart.axis(this.config.chartConfig.BasiAttribute.x.name, this.config.chartConfig.BasiAttribute.x.axis);
  }
  if (this.config.chartConfig.BasiAttribute.y.scale) {
    this.chart.scale(this.config.chartConfig.BasiAttribute.y.name, this.config.chartConfig.BasiAttribute.y.scale);
  }
  if (this.config.chartConfig.BasiAttribute.y.axis) {
    this.chart.axis(this.config.chartConfig.BasiAttribute.y.name, this.config.chartConfig.BasiAttribute.y.axis);
  }

  if (this.config.chartConfig.BasiAttribute.legend) {
    this.chart.legend(this.config.chartConfig.BasiAttribute.legend);
  }
  if (this.config.chartConfig.haveGuide) {
    this.writeguide();
  }
  this.generateCharts();
  this.chart.tooltip({
    share: true
  });
  this.chart.render();
}

public async load_data() {
  const url = this._buildURL(this.config.loadingConfig.url);
  const params = {
    ...this._buildParameters(this.config.loadingConfig.params),
    ...this._buildFilter(this.config.loadingConfig.filter)
  };
  const method = this.config.loadingConfig.method;
  const loadData = await this._load(url, params, this.config.loadingConfig.method);
  if (loadData.success) {
    let data;
    if (loadData.success === 1 || loadData.success === 2) {
      data = loadData.data;
      this.dataList = data;
    } else {
      this.dataList = [];
    }
  }
}

public async load_guide() {
  const url = this._buildURL(this.config.guideConfig.url);
  const params = {
    ...this._buildParameters(this.config.guideConfig.params),
    ...this._buildFilter(this.config.guideConfig.filter)
  };
  const method = this.config.guideConfig.ajaxType;
  const loadData = await this._load(url, params, this.config.guideConfig.ajaxType);
  if (loadData.isSuccess) {
    let data;
    if (method === 'proc') {
      data = loadData.data.dataSet1 ? loadData.data.dataSet1 : [];
      this.guidedataList = data;
    } else {
      data = loadData.data;  // data 是数组
      if (data) {
        this.guidedataList = data;
      } else {
        this.guidedataList = [];
      }
    }
  } else {
    this.guidedataList = [];
  }
}

/*
* 构建URL
* @param ajaxUrl
* @returns {string}
* @private
*/
private _buildURL(ajaxUrl) {
  let url = '';
  if (ajaxUrl && this._isUrlString(ajaxUrl)) {
    url = ajaxUrl;
  } else if (ajaxUrl) {
  }
  return url;
}
/*
* 处理URL格式
* @param url
* @returns {boolean}
* @private
*/
private _isUrlString(url) {
  return Object.prototype.toString.call(url) === '[object String]';
}

/**
 * 构建URL参数
 * @param paramsConfig
 * @returns {{}}
 * @private
 */
private _buildParameters(paramsConfig) {
  let params = {};
  if (paramsConfig) {
    params = CnParameterResolver.resolve({
      params: paramsConfig,
      tempValue: this.tempValue,
      initValue: this.initData,
      cacheValue: this.cacheValue,
      cascadeValue: this.cascadeValue
    });
  }
  return params;
}
/**
 * 构建查询过滤参数
 * @param filterConfig
 * @returns {{}}
 * @private
 */
private _buildFilter(filterConfig) {
  let filter = {};
  if (filterConfig) {
    filter = CnParameterResolver.resolve({
      params: filterConfig,
      tempValue: this.tempValue,
      cacheValue: this.cacheValue
    });
  }
  return filter;
}

private async _load(url, params, method) {
  const mtd = method === 'proc' ? 'post' : method;
  return this.componentService.apiService[mtd](url, params).toPromise();
}


/*
   * 解析级联消息
   */
private resolveRelations() {
}

public ngOnDestroy() {
  // 释放级联对象
  this.unsubscribeRelation();

  if (this.subscription$) {
    this.subscription$.unsubscribe();
  }
}

// 绘制辅助线
public writeguide() {
  this.chart.guide().region({
    start: ['start', 'max'],
    end: ['end', [this.config.chartConfig.guideMin]],
    style: {
      lineWidth: 0,
      fill: '#dcdcdc',
      fillOpacity: 0.3,
      stroke: '#ccc'
    }
  });
  this.chart.guide().text({
    top: true,
    position: ['end', 'max'],
    content: [this.config.chartConfig.guideText],
    style: {
      fill: '#aaaaaa',
      textAlign: 'end',
      textBaseline: 'top',
      fontWeight: 300
    },
    offsetX: -10,
    offsetY: 6
  });
}

/**
 * 生成图表
 */
public generateCharts() {
  if (this.config.chartConfig.BasiAttribute.groupName) {
    this.chart.interval().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name).color(this.config.chartConfig.BasiAttribute.groupName).opacity(1).adjust([{
      type: 'dodge',
      marginRatio: 1 / 32
    }]);  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
  } else if (this.config.chartConfig.haveSubTitle) {
    this.chart.interval().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name).opacity(1)
      .label(this.config.chartConfig.BasiAttribute.y.name, {
        useHtml: true,
        htmlTemplate: (text, item) => {
          const a = item.point;
          a[this.config.chartConfig.subField] = this.config.chartConfig.subTitle;
          return '<span class="g2-label-item"><p class="g2-label-item-value">' + a[this.config.chartConfig.BasiAttribute.y.name] + '</p><p class="g2-label-item-percent">' + a[this.config.chartConfig.subField] + '</p></div>';
        }
      });
  } else if (this.config.chartConfig.haveColorSign) {
    this.chart.interval().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name).opacity(1)
      .color(this.config.chartConfig.BasiAttribute.y.name, val => {
        if (val === this.config.chartConfig.signValue) {
          return this.config.chartConfig.signColor;
        }
        return '#2194ff';
      })
      .label(this.config.chartConfig.BasiAttribute.y.name, {
        offset: 10,
        textStyle: {
          fill: '#595959',
          fontSize: 12
        }
      });
  } else {
    this.chart.interval().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
      .label(this.config.chartConfig.BasiAttribute.y.name, {
        offset: 10,
        textStyle: {
          fill: '#595959',
          fontSize: 12
        }
      });  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
  }
}

public getCurrentComponentId() {
  return this.config.id;
}
}
