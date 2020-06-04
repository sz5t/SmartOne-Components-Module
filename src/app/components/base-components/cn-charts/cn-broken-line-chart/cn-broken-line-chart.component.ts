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
import { DataSet } from '@antv/data-set';

@Component({
  selector: 'app-cn-broken-line-chart',
  templateUrl: './cn-broken-line-chart.component.html',
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
export class CnBrokenLineChartComponent extends CnComponentBase
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() public config; // 配置参数
  @Input() public permissions = [];
  @Input() public dataList = []; // 表格数据集合
  @Input() public initData;
  @Input() public casadeData; // 级联配置 liu 20181023
  @Input() public bsnData;
  @Input() public ref;
  @Input() tempData;
  public KEY_ID: string;
  public value;
  public color;
  public groupName; // 分组字段
  public start_value; // 辅助线的Y开始值
  public end_value; // 辅助线的Y结束值
  public start; // 辅助线的开始X值
  public end; //  辅助线的结束X值
  public condition; // 辅助线的条件
  public showdata = []; // 展示的数组
  public showguide = []; // 辅助线的数组
  public guidedataList = []; // 辅助线的数据集合
  public datalength; // 真实的数据长度
  public ds; // 读取的全部数据
  public dv; // 根据要求过滤出的视图
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
    // 设置辅助线值绑定的基本属性
    this.value = this.config.chartConfig.BasiAttribute.y.name ? this.config.chartConfig.BasiAttribute.y.name : 'value';
    this.start_value = this.config.chartConfig.guideBasicAttribute.start_value ? this.config.chartConfig.guideBasicAttribute.start_value : 'start_value';
    this.end_value = this.config.chartConfig.guideBasicAttribute.end_value ? this.config.chartConfig.guideBasicAttribute.end_value : 'end_value';
    this.start = this.config.chartConfig.guideBasicAttribute.start ? this.config.chartConfig.guideBasicAttribute.start : 'start'
    this.end = this.config.chartConfig.guideBasicAttribute.end ? this.config.chartConfig.guideBasicAttribute.end : 'end'
    this.condition = this.config.chartConfig.guideBasicAttribute.condition ? this.config.chartConfig.guideBasicAttribute.condition : 'conditon'
    this.color = this.config.chartConfig.guideBasicAttribute.color ? this.config.chartConfig.guideBasicAttribute.color : 'color'
    if (!this.config.chartConfig.guideBasicAttribute.transformData) {
      this.groupName = this.config.chartConfig.guideBasicAttribute.groupName ? this.config.chartConfig.guideBasicAttribute.groupName : null
    }
    this._initInnerValue();
    // this.resolveRelations();
    // this.dataList = [
    // { year: '1991', value: 3 },
    // { year: '1992', value: 4 },
    // { year: '1993', value: 3.5 },
    // { year: '1994', value: 5 },
    // { year: '1995', value: 4.9 },
    // { year: '1996', value: 6 },
    // { year: '1997', value: 7 },
    // { year: '1998', value: 9 },
    // { year: '1999', value: 13 }
    // ];
    // this.guidedataList = [
    //   { name: 'YEAR_VALUE', start: '1991', end: '1999', YEAR_VALUE: 8, condition: '>', color: '#FF4D4F' },
    //   { name: 'YEAR_VALUE', start: '1991', end: '1999', YEAR_VALUE: 4, condition: '<', color: '#FFA500' },
    // ]
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
    if (this.config.chartConfig.showUserPoint) {
      setTimeout(() => {
        this.registerPointStyle();
      })
    }

    if (this.config.loadingOnInit) {
      setTimeout(() => {
        this.load();
      }, 0);
    }
  }

  public getCurrentComponentId() {
    return this.config.id;
  }

  public async load() {

    await this.load_data();
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.config.chartConfig.guideConfig) {
      await this.load_guide();
    }

    this.CreateChart_Line();
  }

  /**
   * CreateChart_Bar  生成折线图
   */
  public CreateChart_Line() {
    this.chart = new G2.Chart({
      container: this.chartElement.nativeElement, // 指定图表容器 ID
      animate: true, // 动画 默认true
      forceFit: true,  // 图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
      // width: 600,  // 当 forceFit: true  时宽度配置不生效
      height: this.config.chartConfig.BasiAttribute.height ? this.config.chartConfig.BasiAttribute.height : 300, // 指定图表高度
      padding: 'auto'
    });

    this.axisInit();

    if (!this.config.chartConfig.BasiAttribute.transformData) {
      this.chart.source(this.dataList);
    } else {
      this.ds = new DataSet({
        state: {}
      });
      this.dv = this.ds.createView();
      this.transformData();
      this.chart.source(this.dv);
    }

    if (this.config.chartConfig.BasiAttribute.legend) {
      this.chart.legend(this.config.chartConfig.BasiAttribute.legend);
    }

    if (this.config.chartConfig.haveGuide) {
      this.writeAllAssist();
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
    const url = this._buildURL(this.config.chartConfig.guideConfig.url);
    const params = {
      ...this._buildParameters(this.config.chartConfig.guideConfig.params),
      ...this._buildFilter(this.config.chartConfig.guideConfig.filter)
    };
    const loadData = await this._load(url, params, this.config.chartConfig.guideConfig.method);
    if (loadData.success) {
      let data;
      if (loadData.success === 1 || loadData.success === 2) {
        data = loadData.data;
        this.guidedataList = data;
      } else {
        this.guidedataList = [];
      }
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

  // 绘制各种辅助功能
  public writeAllAssist() {
    if (this.config.chartConfig.guideMin) {
      const min = this.config.chartConfig.guideMin;
      const text = this.config.chartConfig.guideText ? this.config.chartConfig.guideText : '满足区域'
      this.writeFixedRegion(min, text);
    }

    if (this.config.chartConfig.guideConfig) {
      const userGuide = this.config.chartConfig.showUserGuide ? this.config.chartConfig.showUserGuide : false;
      this.writeGuideLine(userGuide);
    }

    if (this.config.chartConfig.peakValue) {
      const groupPeakValue = this.config.chartConfig.BasiAttribute.groupName ? this.config.chartConfig.BasiAttribute.groupName : false
      this.writePeakValue(groupPeakValue);
    }
  }

  /**
   * 生成图表
   */
  public generateCharts() {
    if (this.config.chartConfig.showUserPoint) {
      if (this.config.chartConfig.BasiAttribute.groupName) {
        this.chart
          .line()
          .position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .color(this.config.chartConfig.BasiAttribute.groupName)
          .shape('breathPoint');
        this.chart
          .point()
          .position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .color(this.config.chartConfig.BasiAttribute.groupName)
          .size(4)
          .shape('breathPoint')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      } else if (this.config.chartConfig.BasiAttribute.transformData) {
        this.chart.line().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name);
        this.chart.point().position(this.config.chartConfig.BasiAttribute.x.name + '*' + 'value')
          .size(4)
          .color('groupFiled')
          .shape('breathPoint')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });;  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      } else if (!this.config.chartConfig.BasiAttribute.transformData) {
        this.chart.line().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name);
        this.chart.point().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .size(4)
          .shape('breathPoint')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });;  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      }

    } else {
      if (this.config.chartConfig.BasiAttribute.groupName) {
        this.chart
          .line()
          .position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .color(this.config.chartConfig.BasiAttribute.groupName)
          .shape('smooth');
        this.chart
          .point()
          .position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .color(this.config.chartConfig.BasiAttribute.groupName)
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      } else if (this.config.chartConfig.BasiAttribute.transformData) {
        this.chart.line().position(this.config.chartConfig.BasiAttribute.x.name + '*' + 'value')
        .color('groupFiled').shape('smooth');
        this.chart.point().position(this.config.chartConfig.BasiAttribute.x.name + '*' + 'value')
          .size(4)
          .color('groupFiled')
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });;  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      } else if (!this.config.chartConfig.BasiAttribute.transformData) {
        this.chart.line().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name);
        this.chart.point().position(this.config.chartConfig.BasiAttribute.x.name + '*' + this.config.chartConfig.BasiAttribute.y.name)
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });;  // 创建柱图特殊写法  X*Y  'caseName*caseCount' year*sales
      }
    }
  }

  // 绘制辅助线
  /**
   * writeGuideLine
   */
  public writeGuideLine(bs) {
    if (bs) {
      this.guidedataList.forEach(guide => {
        this.chart.guide().line({
          top: true,
          start: [guide[this.start], guide[this.start_value]],
          end: [guide[this.end], guide[this.end_value]],
          lineStyle: {
            stroke: '#595959',
            lineWidth: 1,
            lineDash: [3, 3]
          },
          text: {
            position: 'start',
            style: {
              fill: '#8c8c8c',
              fontSize: 12,
              fontWeight: 300
            },
            content: '均值线 5,396万',
            offsetY: -5
          }
        });
        const cond = guide[this.condition] === '<' ? 'left' : 'right'
        // let cond;
        // if (guide[this.condition] === '<') {
        //   cond = 'left'
        // } else {
        //   cond = 'right';
        // }
        this.writeUserRegion(cond, guide[this.start_value], guide[this.color]);
      });
    } else {
      this.guidedataList.forEach(guide => {
        this.chart.guide().line({
          top: true,
          start: [guide[this.start], guide[this.start_value]],
          end: [guide[this.end], guide[this.end_value]],
          lineStyle: {
            stroke: '#595959',
            lineWidth: 1,
            lineDash: [3, 3]
          },
          text: {
            position: 'start',
            style: {
              fill: '#8c8c8c',
              fontSize: 12,
              fontWeight: 300
            },
            content: '均值线 5,396万',
            offsetY: -5
          }
        });
      });
    }
  }

  // 绘制固定的自上往下的区域
  /**
   * min:最小值
   * text：区域的显示文本
   */
  public writeFixedRegion(min, text) {
    this.chart.guide().region({
      start: ['start', 'max'],
      end: ['end', [min]],
      style: {
        lineWidth: 0,
        fill: '#4169E1', // 填充区域的颜色
        fillOpacity: 0.3,
        stroke: '#ccc'
      }
    });
    this.chart.guide().text({
      top: true,
      position: ['end', 'max'],
      content: [text],
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
   * writeUserRegion 绘制自定义的图形染色区域
   */
  public writeUserRegion(cond, value, userColor) {
    if (cond === 'right') {
      this.chart.guide().regionFilter({
        top: true,
        start: ['min', 'max'],
        end: ['max', value],
        color: userColor
      });
    } else if (cond === 'left') {
      this.chart.guide().regionFilter({
        top: true,
        start: ['min', value],
        end: ['max', 'min'],
        color: userColor
      });
    }
  }

  /**
   * 标记点的样式
   */
  public registerPointStyle() {
    const Shape = G2.Shape;
    const that = this;
    Shape.registerShape('point', 'breathPoint', {
      drawShape(cfg, container) {
        const data = cfg.origin._origin;
        const point = { x: cfg.x, y: cfg.y };
        let condition = 0; // 判断规则值数组和数据源的条件关系
        if (that.guidedataList.length > 0) {
          that.guidedataList.forEach(e => {
            if (e[that.condition] === '>') {
              if (data[that.value] >= e[that.config.chartConfig.guideBasicAttribute.end_value]) {
                condition = 1
              }
            } else if (e[that.condition] === '<') {
              if (data[that.value] <= e[that.config.chartConfig.guideBasicAttribute.end_value]) {
                condition = 1
              }
            }
          })
        }
        if (condition === 1) {
          const decorator1 = container.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 10,
              fill: '#1890ff',
              opacity: 0.5
            }
          });
          const decorator2 = container.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 10,
              fill: '#1890ff',
              opacity: 0.5
            }
          });
          const decorator3 = container.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 10,
              fill: '#1890ff',
              opacity: 0.5
            }
          });
          decorator1.animate({
            r: 20,
            opacity: 0,
            repeat: true
          }, 1800, 'easeLinear');
          decorator2.animate({
            r: 20,
            opacity: 0,
            repeat: true
          }, 1800, 'easeLinear', () => { }, 600);
          decorator3.animate({
            r: 20,
            opacity: 0,
            repeat: true
          }, 1800, 'easeLinear', () => { }, 1200);
          container.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 6,
              fill: '#1890ff',
              opacity: 0.7
            }
          });
          container.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 1.5,
              fill: '#1890ff'
            }
          });
        }
      }
    });
  }

  /**
   * writePeakValue 静态数据集展示最大值最小值
   */
  public writePeakValue(group) {
    if (!this.groupName) {
      const max_min = this.findMaxMin();
      const max = max_min.max;
      const min = max_min.min;
      if (max_min) {
        this.chart.guide().dataMarker({
          top: true,
          content: '峰值：' + max[this.value],
          position: [max[this.config.chartConfig.BasiAttribute.x.name], max[this.value]],
          style: {
            text: {
              fontSize: 13,
              stroke: 'white',
              lineWidth: 2
            }
          },
          lineLength: 40
        });
        this.chart.guide().dataMarker({
          top: true,
          content: '谷值：' + min[this.value],
          position: [min[this.config.chartConfig.BasiAttribute.x.name], min[this.value]],
          style: {
            text: {
              fontSize: 13,
              stroke: 'white',
              lineWidth: 2
            }
          },
          lineLength: 50
        });
      }
    } else {
      const group = [];
      group.push(this.dataList[0][this.groupName]);
      for (let i = 0; i < this.dataList.length; i++) {
        for (let j = 0; j < group.length; j++) {
          if (!group.includes(this.dataList[i][this.groupName])) {
            // if (this.dataList[i][this.groupName] !== group[group.length - 1]) {
            group.push(this.dataList[i][this.groupName]);
          }
        }
      }
      group.forEach(element => {
        const max_min = this.findMaxMin(element);
        const max = max_min.max;
        const min = max_min.min;
        if (max_min) {
          this.chart.guide().dataMarker({
            top: true,
            content: element + '的峰值：' + max[this.value],
            position: [max[this.config.chartConfig.BasiAttribute.x.name], max[this.value]],
            style: {
              text: {
                fontSize: 13,
                stroke: 'white',
                lineWidth: 2
              }
            },
            lineLength: 30
          });
          this.chart.guide().dataMarker({
            top: true,
            content: element + '的谷值：' + min[this.value],
            position: [min[this.config.chartConfig.BasiAttribute.x.name], min[this.value]],
            style: {
              text: {
                fontSize: 13,
                stroke: 'white',
                lineWidth: 2
              }
            },
            lineLength: 50
          });

        }
      });
    }
  }

  /**
   * findMaxMin 具体的计算最值的方法
   */
  public findMaxMin(element?) {
    if (!element) {
      let maxValue = 0;
      let minValue = 50000;
      let maxObj = null;
      let minObj = null;
      const length = this.dataList.length
      for (let i = 0; i < length; i++) {
        const d = this.dataList[i];
        if (d[this.value] >= maxValue) {
          maxValue = d[this.value];
          maxObj = d;
        }
        if (d[this.value] < minValue) {
          minValue = d[this.value];
          minObj = d;
        }
      }
      return {
        max: maxObj,
        min: minObj
      };
    } else {
      let maxValue = 0;
      let minValue = 50000;
      let maxObj = null;
      let minObj = null;
      const length = this.dataList.length
      for (let i = 0; i < length; i++) {
        const d = this.dataList[i];
        if (d[this.groupName] === element) {
          if (d[this.value] >= maxValue) {
            maxValue = d[this.value];
            maxObj = d;
          }
          if (d[this.value] < minValue) {
            minValue = d[this.value];
            minObj = d;
          }
        }
      }
      return {
        max: maxObj,
        min: minObj
      };
    }
  }

  /**
   * axisInit 坐标轴初始化
   */
  public axisInit() {
    if (this.config.chartConfig.BasiAttribute.x.scale) {
      this.chart.scale(this.config.chartConfig.BasiAttribute.x.name, this.config.chartConfig.BasiAttribute.x.scale);
    }
    if (this.config.chartConfig.BasiAttribute.x.axis) {
      this.chart.axis(this.config.chartConfig.BasiAttribute.x.name, this.config.chartConfig.BasiAttribute.x.axis);
    }
    if (this.config.chartConfig.BasiAttribute.y) {
      if (this.config.chartConfig.BasiAttribute.y.scale) {
        this.chart.scale(this.config.chartConfig.BasiAttribute.y.name, this.config.chartConfig.BasiAttribute.y.scale);
      }
      if (this.config.chartConfig.BasiAttribute.y.axis) {
        this.chart.axis(this.config.chartConfig.BasiAttribute.y.name, this.config.chartConfig.BasiAttribute.y.axis);
      }
    }
  }

  /**
   * transformData 一行数据中分组数据，改造数据源
   */
  public transformData() {
    const filedName = this.config.chartConfig.BasiAttribute.groupFiled.split(',');
    const fields = []
    filedName.forEach(d => {
      fields.push(d);
    })
    this.dv.source(this.dataList)
      .transform({
        type: 'fold',
        fields: [filedName[0], filedName[1]], // 展开字段集
        key: 'groupFiled', // key字段
        value: 'value' // value字段
      });
  }
}
