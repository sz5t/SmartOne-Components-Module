import { CnComponentValidationSenderResolver } from '../../../../resolver/relation/sender/cn-comppnent-validation-sender.resolver';
import { CnComponentInnerSenderResolver } from '../../../../resolver/relation/sender/cn-component-inner-sender.resolver';
import { CnOperationResolver } from "../../../../resolver/operation/cn-operation.resolver";
import DataSet from '@antv/data-set';
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
  selector: 'app-cn-fan-chart',
  templateUrl: './cn-fan-chart.component.html',
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
export class CnFanChartComponent extends CnComponentBase
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
  public percent; // 饼状图元素的占比
  public item; // 饼状图的元素
  public inner; // 饼状图分组内层的字段
  public outer;// 饼状图分组外层的字段
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

  // 设置饼状图元素
  this.item = this.config.chartConfig.BasiAttribute.item.name ? this.config.chartConfig.BasiAttribute.item.name : 'item'

  // 设置饼状图元素占比
  this.percent = this.config.chartConfig.BasiAttribute.percent.name ? this.config.chartConfig.BasiAttribute.percent.name : 'percent'

  if (this.config.chartConfig.BasiAttribute.groupConfig) {
  // 分组展示的内层
  this.inner = this.config.chartConfig.BasiAttribute.groupConfig.inner ? this.config.chartConfig.BasiAttribute.groupConfig.inner : ''

  // 分组展示的外层
  this.outer = this.config.chartConfig.BasiAttribute.groupConfig.outer ? this.config.chartConfig.BasiAttribute.groupConfig.outer : ''
  }
  this._initInnerValue();
  // this.resolveRelations();
  // this.dataList = [
  //   { item: '事例一', count: 40, percent: 0.4 },
  //   { item: '事例二', count: 21, percent: 0.21 },
  //   { item: '事例三', count: 17, percent: 0.17 },
  //   { item: '事例四', count: 13, percent: 0.13 },
  //   { item: '事例五', count: 9, percent: 0.09 }
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
  if (this.config.chartConfig.BasiAttribute.ring) {
    this.registerRing();
  }
  if (this.config.loadingOnInit) {
    setTimeout(() => {
      this.load();
    }, 0);
  }

}
public ngAfterContentInit() {

}

public getCurrentComponentId() {
  return this.config.id;
}

public async load() {

  await this.load_data();
  if (this.chart) {
    this.chart.destroy();
  }
  if (this.config.chartConfig.BasiAttribute.group) {
    this.CreateGroupChart_Fan();
  } else {
    this.CreateChart_Fan();
  }
}

/**
 * CreateChart_Fan  生成饼状图
 */
public CreateChart_Fan() {
  this.chart = new G2.Chart({
    container: this.chartElement.nativeElement, // 指定图表容器 ID
    animate: true, // 动画 默认true
    forceFit: true,  // 图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
    // width: 600,  // 当 forceFit: true  时宽度配置不生效
    height: this.config.chartConfig.BasiAttribute.height ? this.config.chartConfig.BasiAttribute.height : 300, // 指定图表高度
    padding: 'auto'
  });
  this.chart.source(this.dataList, {
    [this.percent]: {
      formatter: val => {
        val = (val * 100) + '%';
        return val;
      }
    }
  });

  if (this.config.chartConfig.BasiAttribute.legend) {
    this.chart.legend(this.config.chartConfig.BasiAttribute.legend);
  }
  let yh = 0;
  if (this.config.chartConfig.BasiAttribute.ring) {
    yh = 1;
  }
  this.coord(yh);
  this.generateCharts();
  this.chart.tooltip('item*percent', (item, percent) => {
    return {
      name: item,
      value: percent
    };
  })
  this.chart.render();
}

/**
 * CreateGroupChart_Fan 生成具有分组展示的饼状图
 */
public CreateGroupChart_Fan() {
  this.chart = new G2.Chart({
    container: this.chartElement.nativeElement, // 指定图表容器 ID
    animate: true, // 动画 默认true
    forceFit: true,  // 图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
    // width: 600,  // 当 forceFit: true  时宽度配置不生效
    height: this.config.chartConfig.BasiAttribute.height ? this.config.chartConfig.BasiAttribute.height : 300, // 指定图表高度
    padding: 'auto'
  });
  this.CreateGroupData();

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
  if (this.config.chartConfig.BasiAttribute.ring) {
    this.chart.intervalStack()
      .position(this.percent)
      .color(this.item)
      .label([this.percent], {
        formatter: (val, item) => {
          // console.log(item);
          return item.point[this.item] + ': ' + val;
        }
      })
      .shape('sliceShape')
  } else {
    this.chart.intervalStack()
      .position(this.percent)
      .color(this.item)
      .label([this.percent], {
        formatter: (val, item) => {
          // console.log(item);
          return item.point[this.item] + ': ' + val;
        }
      }) // 创建饼图特殊写法  X*Y  'caseName*caseCount' year*sales
  }
}

/**
 * registerRing 环形图
 */
public registerRing() {
  const sliceNumber = 0.01; // 圆环间的间距 0-1之间
  G2.Shape.registerShape('interval', 'sliceShape', {
    draw(cfg, container) {
      const points = cfg.points;
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y - sliceNumber]);
      path.push(['L', points[2].x, points[2].y - sliceNumber]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path
        }
      });
    }
  });
}

/**
 * coord 扇形和圆环的控制
 */
public coord(bs) {
  if (bs === 1) {
    this.chart.coord('theta', {
      // radius: 0.75
      innerRadius: 0.75
    });
  } else {
    this.chart.coord('theta', {
      radius: 0.75
      // innerRadius: 0.75
    });
  }
}

/**
 * calculateRatio 根据具体值计算饼图占比
 */
public calculateRatio(dv,d) {
  dv.source(this.dataList).transform({
    type: 'percent',
    field: 'VALUE',
    dimension: d,
    as: 'percent'
  });
  return dv;
}

/**
 * CreateGroupData 创建饼图的内外分组
 */
public CreateGroupData() {
  const innerDS = new DataSet();
  let innerDV = innerDS.createView().source(this.dataList);
  if (this.config.chartConfig.BasiAttribute.calculateRatio) {
    innerDV = this.calculateRatio(innerDV,this.inner);
  }
  this.chart.source(innerDV, {
    percent: {
      formatter: (val) => {
        val = (val * 100).toFixed(2) + '%';
        return val;
      }
    }
  });
  this.chart.coord('theta', {
    radius: 0.5
  });
  this.chart.tooltip({
    showTitle: false
  });
  this.chart.legend(false);
  this.chart.intervalStack().position('percent').color(this.inner).label(this.inner, {
    offset: -10
  }).tooltip(this.outer + '*percent', (item, percent) => {
    percent = (percent * 100).toFixed(2) + '%';
    return {
      name: item,
      value: percent
    };
  }).select(false).style({
    lineWidth: 1,
    stroke: '#fff'
  });

const outView = this.chart.view();
let outterDV = innerDS.createView().source(this.dataList);
outterDV = this.calculateRatio(outterDV,this.outer);
outView.source(outterDV, {
  percent: {
    formatter: (val)=> {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  }
});
outView.coord('theta', {
  innerRadius: 0.5 / 0.75,
  radius: 0.75
});
outView.intervalStack().position('percent').color(this.outer, ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']).label(this.outer).tooltip(this.outer + '*percent', (item, percent)=> {
  percent = (percent * 100).toFixed(2) + '%';
  return {
    name: item,
    value: percent
  };
}).select(false).style({
  lineWidth: 1,
  stroke: '#fff'
});
}
}
