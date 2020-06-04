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
import { getISOYear, getMonth, getDate, getHours, getTime, getMinutes, getSeconds } from 'date-fns';
import { CN_CHARTS_METHOD } from "../cn-charts.methods";
import { isArray } from 'util';

@Component({
  selector: 'app-cn-multiple-y-axis-chart',
  templateUrl: './cn-multiple-y-axis-chart.component.html',
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
export class CnMultipleYAxisChartComponent extends CnComponentBase
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

  public showdata = []; // 展示的数组
  public showguide = []; // 辅助线的数组
  public guidedataList = []; // 辅助线的数据集合
  public ruledataList = []; // 规则算出的标准值的集合
  public rulenameList = []; // 规则转换的展示值集合
  public stageRuleDatalist = []; // 阶段开始的标准
  public stageCurrentDatalist = []; // 当前阶段的数组


  public curStage; // 自动播放的阶段变量
  public refreshNumber = 1; // 分组自动刷新的增量
  public autoPlay;
  public next = 1; // 自动播放的标识变量
  public curNum = 1; // 默认的设备数据阶段
  public StageTime; // 启动阶段的时间

  public ds; // 读取的全部数据
  public dv; // 根据要求过滤出的视图
  public datalength; // 真实的数据长度
  public Shape; // 自定义样式效果
  public test = []; // 辅助线的图例数组
  public filedName = []; // 图表Y轴的字段数组
  public filedShowName = []; // 图表展示的字段数组
  public guideFiled; // 辅助线对应哪个Y轴的字段

  public groupMax = []; // 分组每组最大值的数组
  public groupMin = []; // 分组每组最小值的数组
  public itemName = []; // 分组名称的数组
  public chartName; // 图表的名称
  public showDataLength; // 分组的展示数据长度（暂时只有分组折线使用）
  public y1andgroup = false; // 分组+双轴的标识
  public yDataArray = []; // 需要画图的y轴字段数组
  public yField = []; // y轴字段的数据

  // 初始化的属性
  public x; // 横轴的字段
  public y; // y左轴的字段
  public yType;
  public color = [];
  public y1;
  public minValue;
  public maxValue;
  public end;
  public start;
  public intervalTime;
  public groupName;
  // tempValue = {};
  @Output() public updateValue = new EventEmitter();
  @ViewChild('container', { static: false }) public chartElement: ElementRef;
  @ViewChild('slider', { static: false }) public sliderElement: ElementRef;
  @ViewChild('chartNameContainer', { static: false }) public chartNameElement: ElementRef;
  public chart;
  public slider;
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
    this.x = this.config.chartConfig.BasiAttribute.x.name

    this.y = this.config.chartConfig.BasiAttribute.yDataArray[0].name;

    // yDataArray控制画图数据，生成Y轴
    this.yDataArray = this.config.chartConfig.BasiAttribute.yDataArray;
    if (this.yDataArray) {
      for (let i = 0; i < this.yDataArray.length; i++) {
        this.yField.push(this.yDataArray[i].name)
      }
    }

    if (this.config.chartConfig.guideConfig) {
      this.maxValue = this.config.chartConfig.guideBasicAttribute.max ? this.config.chartConfig.guideBasicAttribute.max : 'MAXVALUE';

      this.minValue = this.config.chartConfig.guideBasicAttribute.min ? this.config.chartConfig.guideBasicAttribute.min : 'MINVALUE';

      this.start = this.config.chartConfig.guideBasicAttribute.start ? this.config.chartConfig.guideBasicAttribute.start : 'START_TIME'

      this.end = this.config.chartConfig.guideBasicAttribute.end ? this.config.chartConfig.guideBasicAttribute.end : 'END_TIME'

      this.guideFiled = this.config.chartConfig.guideBasicAttribute.guideFiled ? this.config.chartConfig.guideBasicAttribute.guideFiled : 'FILED'
    }

    if (this.config.chartConfig.autoPlay) {
      this.intervalTime = this.config.chartConfig.intervalTime ? this.config.chartConfig.intervalTime : 2000;
    }

    if (this.config.chartConfig.showDataLength) {
      this.datalength = this.config.chartConfig.showDataLength
    }

    this.initComponent();

    this._initInnerValue();

    this.relationResolve(this);
  }

  initComponent() {
    this.COMPONENT_NAME = "CnCharts";
    // this.COMPONENT_PROPERTY = CN_DATA_TABLE_PROPERTY;
    this.COMPONENT_METHODS = CN_CHARTS_METHOD;

    // this.KEY_ID = this.config.keyId;
    // this.pageSize = this.config.pageSize;
  }

  public _initInnerValue() {
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

  public async load() {

    this.dataList = await this.createUrlParams(this.config.loadingConfig);
    if (this.config.chartConfig.showDataLength) {
      await this.sourceModify(this.config.chartConfig.showDataLength);
    }

    if (this.config.chartConfig.stageRuleConfig) {
      this.stageRuleDatalist = await this.createUrlParams(this.config.chartConfig.stageRuleConfig);
      this.setDataStage('static', this.showdata, 1);
    }

    if (this.chart) {
      this.chart.destroy();
    }

    if (this.config.chartConfig.ruleConfig) {
      this.ruledataList = await this.createUrlParams(this.config.chartConfig.ruleConfig);
      if (this.config.chartConfig.curStageConfig) {
        this.stageCurrentDatalist = await this.createUrlParams(this.config.chartConfig.curStageConfig);
      }
    }

    if (this.config.chartConfig.ruleNameConfig) {
      this.rulenameList = await this.createUrlParams(this.config.chartConfig.ruleNameConfig);
    }

    if (this.config.chartConfig.guideConfig) {
      this.guidedataList = await this.createUrlParams(this.config.chartConfig.guideConfig);
    }


    if (this.config.chartConfig.showUserPoint) {
      this.registerPointStyle();
    }

    this.CreateChart_TimeLine();
  }

  /**
   * CreateChart_Bar  生成折线图
   */
  public CreateChart_TimeLine() {
    this.chart = new G2.Chart({
      container: this.chartElement.nativeElement, // 指定图表容器 ID
      animate: true, // 动画 默认true
      forceFit: true,  // 图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
      // width: 600,  // 当 forceFit: true  时宽度配置不生效
      height: this.config.chartConfig.BasiAttribute.height ? this.config.chartConfig.BasiAttribute.height : 300, // 指定图表高度
      // padding: 'auto'
      padding: [60, 90, 60, 120]
    });
    this.showdata = this.showdata.length > 0 ? this.showdata : this.dataList
    const dataLength = this.config.chartConfig.showDataLength
    this.ds = new DataSet({
      state: {
        from: new Date(this.showdata[0][this.x]).getTime(),
        to: new Date(this.showdata[dataLength - 1][this.x]).getTime()
      }
    });

    this.axisInit();

    const sliderdata = this.config.chartConfig.autoPlay ? this.showdata : this.dataList;

    this.createSlider(sliderdata);

    this.dv = this.ds.createView();
    this.dv.source(sliderdata)
      .transform({
        type: 'filter',
        callback: obj => {
          const a = new Date(obj[this.x]);
          return (new Date(obj[this.x])).getTime() >= this.ds.state.from && (new Date(obj[this.x])).getTime() <= this.ds.state.to;
        }
      });

    this.chart.source(this.dv);

    if (this.config.chartConfig.BasiAttribute.legend) {
      this.chart.legend(this.config.chartConfig.BasiAttribute.legend);
    }
    if (this.config.chartConfig.haveGuide) {
      this.writeAllAssist();
    }
    this.createLineAndPoint();
    this.chart.tooltip({
      share: true
    });
    this.chart.render();
    if (this.config.chartConfig.autoPlay) {
      const that = this;
      this.autoPlay = setInterval(async () => {
        this.dataList = await this.createUrlParams(this.config.loadingConfig);
        this.next = this.next + 1;
        if (this.datalength) {
          if (this.showdata[this.datalength - 1]) {
            if (this.dataList[this.dataList.length - 1] !== this.showdata[this.datalength - 1]) {
              if (this.refreshNumber === 1) {
                for (let aa = 0; aa < this.refreshNumber; aa++) {
                  this.showdata.shift();
                  this.showdata.push(this.dataList[this.datalength - 2 + this.next + aa]);
                }
              } else {
                for (let aa = 0; aa < this.refreshNumber; aa++) {
                  this.showdata.shift();
                  this.showdata.push(this.dataList[this.datalength + (this.next - 2) * this.refreshNumber + aa]);
                }
              }
              if (this.config.chartConfig.stageRuleConfig) {
                if (!this.curStage) {
                  this.curStage = 1;
                }
                const tempStage = this.curStage;
                if (this.showdata[this.datalength - 1]) {
                  this.setDataStage('dynamic', this.showdata[this.datalength - 1], this.curStage);
                }
                if (this.config.chartConfig.curStageConfig) {
                  this.stageCurrentDatalist = await this.createUrlParams(this.config.chartConfig.curStageConfig);
                }
                if (this.curStage !== 1 && tempStage === this.curStage) {
                  this.curNum += 1;
                } else {
                  this.curNum = 1;
                }
                this.showdata[this.datalength - 1]['stage'] = this.curStage - 1;
                this.showdata[this.datalength - 1]['number'] = this.curNum;
              }
              this.slider.start = new Date(this.showdata[0][this.x].replace(/-/g, '/')).getTime();
              this.slider.end = new Date(this.showdata[this.datalength - 1][this.x].replace(/-/g, '/')).getTime();
              if (this.config.chartConfig.guideConfig && this.config.chartConfig.guideConfig.guideType !== 'line') {
                this.ds.state.from = new Date(this.showdata[0][that.x]).getTime();
                this.ds.state.to = new Date(this.showdata[this.showdata.length - 1][that.x]).getTime();
                this.dv.source(this.showdata);
                this.chart.changeData(this.dv);
              } else {
                this.chart.changeData(this.showdata);
              }
              setTimeout(async () => {
                // this.chart.guide().clear();
                if (this.groupName && !(this.config.chartConfig.peakValue)) {
                  await this.getGroupPeakValue();
                }
                this.writeAllAssist(this.slider.start, this.slider.end);
                this.chart.repaint();
              });
              this.slider.changeData(this.showdata);
            }
          } else {
            this.operationAjax(this.showdata[this.datalength - 2][this.x], 'finish');
            if (this.autoPlay) {
              clearInterval(this.autoPlay);
            }
          }
        }
      }, this.intervalTime)
    }
  }

  /**
   * createUrlParams 创建查询的参数，调用方法，返回数据
   */
  public async createUrlParams(config) {
    const url = this._buildURL(config.url);
    const params = {
      ...this._buildParameters(config.params),
      ...this._buildFilter(config.filter)
    };
    const method = config.method;
    const loadData = await this._load(url, params, method);
    if (loadData.success) {
      if (loadData.success === 1 || loadData.success === 2) {
        return loadData.data;
      }
    } else {
      return [];
    }
  }

  /**
   * sourceModify 数据源根据配置展示一部分
   */
  public sourceModify(length) {
    if (this.dataList.length > length) {
      for (let i = 0; i < length; i++) {
        this.showdata.push(this.dataList[i]);
      }
    } else {
      this.showdata = this.dataList;
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

  public ngOnDestroy() {
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

    if (this.autoPlay) {
      clearInterval(this.autoPlay);
    }
  }

  // 绘制各种辅助功能
  public writeAllAssist(startValue?, endValue?) {
    this.chart.guide().clear();
    // 默认的带状区域，最高点往下画
    if (this.config.chartConfig.guideMin) {
      const min = this.config.chartConfig.guideMin;
      const text = this.config.chartConfig.guideText ? this.config.chartConfig.guideText : '满足区域'
      this.writeFixedRegion(min, text);
    }

    // 用户自定义的区间
    if (this.config.chartConfig.guideConfig) {
      // const userGuide = this.config.chartConfig.showUserGuide ? this.config.chartConfig.showUserGuide : false;
      this.writeGuideLine(startValue, endValue);
    }

    // 三层判断，最值-> 自动刷新-> 分组数据
    if (this.config.chartConfig.peakValue) {
      // 是否自动加载数据
      if (this.config.chartConfig.autoPlay) {
        // 是否有分组数据
        if (this.groupName) {
          const group = [];
          group.push(this.showdata[0][this.groupName]);
        } else {

        }
      } else {

      }
    }

  }

  // 绘制辅助线
  /**
   * writeGuideLine
   */
  public writeGuideLine(start?, end?) {
    // 辅助线展示的起始
    let lineStartTime;
    let lineEndTime;
    // 库里面的基线的起始
    let dataStartTime;
    let dataEndTime;
    start = start ? start : this.transStringTime(this.dv.rows[0][this.x]);
    end = end ? end : this.transStringTime(this.dv.rows[this.dv.rows.length - 1][this.x]);
    this.guidedataList.forEach(guide => {
      dataStartTime = this.transStringTime(guide[this.start]);
      dataEndTime = this.transStringTime(guide[this.end]);
      lineStartTime = start > dataStartTime ? start : dataStartTime;
      lineEndTime = end > dataEndTime ? dataEndTime : end;
      lineStartTime = this.transTimeString(lineStartTime);
      lineEndTime = this.transTimeString(lineEndTime);
      const guideContent = this.config.chartConfig.guideContent.find(g => g.name === guide.FILED);
      const toptext = guideContent.maxtext ? guideContent.maxtext : '预警上限';
      const floortext = guideContent.mintext ? guideContent.mintext : '预警下限';
      const textcolor = guideContent.textcolor ? guideContent.textcolor : '#F5222D';
      const guidelinecolor = guideContent.guidelinecolor ? guideContent.guidelinecolor : '#F5222D';
      if (dataStartTime <= end) {
        if (dataEndTime > start) {
          if (guide[this.maxValue]) {
            this.printGuideLine(lineStartTime, guide[this.maxValue], lineEndTime, guide[this.maxValue], toptext, textcolor, guidelinecolor, this.x, guide[this.guideFiled]);
          }

          if (guide[this.minValue]) {
            this.printGuideLine(lineStartTime, guide[this.minValue], lineEndTime, guide[this.minValue], floortext, textcolor, guidelinecolor, this.x, guide[this.guideFiled]);
          }
        }
      }
    });
    // }
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
    const lineguide = this.guidedataList;
    let color;
    // 在Y轴的范围之外的提示
    Shape.registerShape('point', 'overyGuide', {
      drawShape(cfg, container) {
        const data = cfg.origin._origin;
        const point = { x: cfg.x, y: cfg.y };
        const field = cfg.style.field;
        const type = cfg.style.type;
        let condition = 0; // 判断规则值数组和数据源的条件关系
        color = that.config.chartConfig.guideConfig.pointColor ? that.config.chartConfig.guideConfig.pointColor : '#DC143C';
        if (that.guidedataList.length > 0) {
          // that.showdata.forEach(e => {
          lineguide.forEach(t => {
            const btime = that.transStringTime(t[that.start]);
            const etime = that.transStringTime(t[that.end]);
            const datatime = that.transStringTime(data[that.x]);
            if (datatime >= btime && datatime <= etime) {
              if (data[field] && type === t.FILED) {
                if ((t[that.maxValue] && data[field] > t[that.maxValue]) || (t[that.minValue] && data[field] < t[that.minValue])) {
                  condition = 1;
                }
              }
            }
          })
          // });
          if (condition === 1) {
            that.writePointStyle(container, point, color)
          }
        }
      }
    });

    // 不符合计划表中对应点的数据
    Shape.registerShape('point', 'overDataRule', {
      drawShape(cfg, container) {
        const data = cfg.origin._origin;
        const point = { x: cfg.x, y: cfg.y };
        let condition = 0; // 判断规则值数组和数据源的条件关系
        if (that.ruledataList.length > 0) {
          color = that.config.chartConfig.ruleConfig.pointColor ? that.config.chartConfig.ruleConfig.pointColor : '#008000'
          that.ruledataList.forEach(e => {
            // 点的阶段和点处于具体的第几个值都在规则里面有
            if (data['STAGE'] === e['STAGE'] && data['NUMBER'] === e['NUMBER']) {
              // 没有对应规则字段的值
              if(!data[e['FILED']]) {
                condition = 1;
              } else if (data[e['FILED']] && data[e['FILED']] !== e['RULE_VALUE']) {
                condition = 1;
              }
            // 点的阶段有，没有点处于具体的第几个值
            } else if (data['STAGE'] === e['STAGE'] && !that.ruledataList.find(e => (e['NUMBER'] === data['NUMBER']))) {
              condition = 1;
            } else if(!data['STAGE']) {
              condition = 1;
            }
          })
        }
        if (condition === 1) {
          that.writePointStyle(container, point, color);
        }
      }
    });
  }

  // 标记点的方法
  public writePointStyle(container, point, color) {
    const decorator1 = container.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: color,
        opacity: 0.5
      }
    });
    const decorator2 = container.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: color,
        opacity: 0.5
      }
    });
    const decorator3 = container.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: color,
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
        fill: color,
        opacity: 0.7
      }
    });
    container.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 1.5,
        fill: color
      }
    });
  }

  /**
   * axisInit 坐标轴初始化
   */
  public axisInit() {
    if (this.config.chartConfig.BasiAttribute.x.scale) {
      this.chart.scale(this.x, this.config.chartConfig.BasiAttribute.x.scale);
    }
    if (this.config.chartConfig.BasiAttribute.x.axis) {
      this.chart.axis(this.x, this.config.chartConfig.BasiAttribute.x.axis);
      if (this.config.chartConfig.BasiAttribute.formatConfig && this.config.chartConfig.BasiAttribute.formatConfig.x) {
        this.axisFormatter(this.x, this.config.chartConfig.BasiAttribute.x.axis);
      }
    }
    if (this.yDataArray) {
      for (let i = 0; i < this.yDataArray.length; i++) {
        this.chart.axis(this.yDataArray[i].name, this.yDataArray[i].axis);
        if (this.yDataArray[i].scale) {
          this.chart.scale(this.yDataArray[i].name, this.yDataArray[i].scale);
        }
        // if (this.yDataArray[i].formatter) {
        this.axisFormatter(this.yDataArray[i].name, this.yDataArray[i].axis, this.yDataArray[i].color, i, this.yDataArray[i].formatter);
        // }
      }
    }
  }

  /**
   * createSlider 创建时间轴
   */
  public createSlider(data) {
    this.slider = new Slider({
      container: this.sliderElement.nativeElement,
      padding: [0, 100, 0],
      start: this.ds.state.from,
      end: this.ds.state.to,
      data,
      xAxis: this.x,
      yAxis: this.y,
      backgroundChart: {
        type: 'line',
        color: 'grey'
      },
      scales:
      {
        [this.x]: {
          formatter: (val) => {
            return `${getISOYear(val)}-${getMonth(val) + 1}-${getDate(val)}${' '}${getHours(getTime(val))}${':'}${getMinutes(getTime(val))}${':'}${getSeconds(getTime(val))}`;
          }
        }
      },
      onChange: (_ref) => {
        const startValue = _ref.startValue
        const endValue = _ref.endValue;
        this.ds.setState('from', startValue);
        this.ds.setState('to', endValue);
        setTimeout(() => {
          this.writeAllAssist(startValue, endValue);
        });

      }
    });

    this.slider.render();
  }

  public getCurrentComponentId() {
    return this.config.id;
  }

  /**
   * printGuideLine 画辅助线的统一方法
   */
  public printGuideLine(start, startValue, end, endValue, text, textcolor, color, x, y) {
    this.chart.guide().line({
      top: true,
      start: { [x]: start, [y]: startValue },
      end: { [x]: end, [y]: endValue },
      lineStyle: {
        stroke: color,
        lineWidth: 1,
        lineDash: [3, 3]
      },
      text: {
        position: 'start',
        style: {
          fill: textcolor,
          fontSize: 12,
          fontWeight: 300
        },
        content: text,
        offsetY: -5
      }
    });
  }

  /**
   * transTimeString 时间戳转字符串
   */
  public transTimeString(time) {
    return `${getISOYear(time)}-${getMonth(time) + 1}-${getDate(time)}${' '}${getHours(getTime(time))}${':'}${getMinutes(getTime(time))}${':'}${getSeconds(getTime(time))}`;
  }

  /**
   * transStringTime 字符串转时间戳
   */
  public transStringTime(string) {
    return new Date(string.replace(/-/g, '/')).getTime();
  }

  /**
   * operationAjax 提交数据操作
   */
  public async operationAjax(time, temp?) {
    let response;
    if (!temp) {
      response = await this._executeAjaxConfig(
        this.config.chartConfig.stageRuleConfig.operateConfig,
        time
      );
    } else {
      response = await this._executeAjaxConfig(
        this.config.chartConfig.stageRuleConfig.finishConfig,
        time
      );
    }
  }

  /**
   * _executeAjaxConfig 异步执行SQL提交数据
   */
  public async _executeAjaxConfig(ajaxConfig, handleData) {
    const url = ajaxConfig.url;
    let executeParam = CnParameterResolver.resolve({
      params: ajaxConfig.params
    });
    const tempCondition = { 'time': handleData, 'stage': this.curStage }
    executeParam = { ...executeParam, ...tempCondition }

    const response = await this.componentService.apiService[ajaxConfig.ajaxType](url, executeParam).toPromise();

    // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
    this._sendDataSuccessMessage(response, ajaxConfig.result);

    // 处理validation结果
    const validationResult = this._sendDataValidationMessage(response, ajaxConfig.result);

    // 处理error结果
    const errorResult = this._sendDataErrorMessage(response, ajaxConfig.result);

    // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
    return validationResult && errorResult;
  }

  // 发送成功的消息内容
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

  // 发送警告的消息内容
  private _sendDataValidationMessage(response, resultCfg) {
    let result = true;
    if (response && Array.isArray(response.validation) && response.validation.length <= 0) {
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

  // 发送错误的消息内容
  private _sendDataErrorMessage(response, resultCfg) {
    let result = true;
    if (response && Array.isArray(response.error) && response.error.length <= 0) {
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

  // 静态数据判断点的阶段，回写阶段时间
  /**
   * data 需要判断的数据集
   */
  public setDataStage(kind, data, curStage?) {
    const stage = this.config.chartConfig.stageRuleConfig.stageFiled;
    const currentStage = [];
    let stageRule = {};
    curStage = curStage ? curStage : this.curStage
    for (const item of this.stageRuleDatalist) {
      if (item[stage] === curStage) {
        currentStage.splice(0, 0, item);
      }
    }

    currentStage.forEach(s => {
      const field = s['FIEL'];
      const value = s['FIEL_VALUE'];
      const obj = { [field]: value }
      stageRule = { ...stageRule, ...obj }
    })
    if (kind === 'static') {
      let num = 0;
      data.forEach(e => {
        num += 1;
        const field = Object.keys(stageRule)[0];
        const value = stageRule[Object.keys(stageRule)[0]];
        let field1;
        let value1;
        if (Object.keys(stageRule).length > 1) {
          field1 = Object.keys(stageRule)[1];
          value1 = stageRule[Object.keys(stageRule)[1]];
        }
        if (Object.keys(stageRule).length === 1) {
          if (e[field] && e[field] === value) {
            this.operationAjax(e[this.x]);
            this.curStage += 1;
          }
        } else if (e[field] && e[field] === value && e[field1] && e[field1] === value1) {
          this.operationAjax(e[this.x]);
          this.curStage += 1;
        }
        e['stage'] = this.curStage - 1;
        e['number'] = num;
      });
    } else if (kind === 'dynamic') {
      const field = Object.keys(stageRule)[0];
      const value = stageRule[Object.keys(stageRule)[0]];
      let field1;
      let value1;
      if (Object.keys(stageRule).length > 1) {
        field1 = Object.keys(stageRule)[1];
        value1 = stageRule[Object.keys(stageRule)[1]];
      }
      if (Object.keys(stageRule).length === 1) {
        if (data[field] && data[field] === value) {
          this.operationAjax(data[this.x]);
          this.curStage += 1;
        }
      } else if (data[field] && data[field] === value && data[field1] && data[field1] === value1) {
        this.operationAjax(data[this.x]);
        this.curStage += 1;
      }
    }
  }

  /**
   * getGroupPeakValue 获取分组峰谷值
   */
  public async getGroupPeakValue() {
    this.groupMax = [];
    this.groupMin = [];
    if (this.itemName.length !== this.refreshNumber) {
      this.refreshNumber = this.itemName.length
    }
    for (const item of this.itemName) {
      this.groupMax.push(this.findMax(item[this.groupName])[this.y]);
      this.groupMin.push(this.findMin(item[this.groupName])[this.y]);
    }
  }

  // 静态图表计算峰值
  public findMaxMin(start?, end?, e?) {
    if (start && end) {
      if (!e) {
        let maxValue = 0;
        let minValue = 50000;
        let maxObj = null;
        let minObj = null;
        // const length = this.dataList.length > this.showDataLength ? this.showDataLength : this.dataList.length
        const length = this.dataList.length;
        for (let i = 0; i < length; i++) {
          // 日期转时间戳进行比较
          const d = this.dataList[i];
          let date = this.dataList[i][this.x];
          date = date.replace(/-/g, '/');
          date = new Date(date).getTime();
          if (date >= start && date <= end) {
            if (d[this.y] >= maxValue) {
              maxValue = d[this.y];
              maxObj = d;
            }
            if (d[this.y] < minValue) {
              minValue = d[this.y];
              minObj = d;
            }
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
        const length = this.dataList.length > this.showDataLength ? this.showDataLength : this.dataList.length
        for (let i = 0; i < length; i++) {
          const d = this.dataList[i];
          if (d[this.groupName] === e) {
            if (d[this.y] >= maxValue) {
              maxValue = d[this.y];
              maxObj = d;
            }
            if (d[this.y] < minValue) {
              minValue = d[this.y];
              minObj = d;
            }
          }
        }
        return {
          max: maxObj,
          min: minObj
        };
      }
    } else {
      if (start) {
        e = start
      }
      if (!e) {
        let maxValue = 0;
        let minValue = 50000;
        let maxObj = null;
        let minObj = null;
        const length = this.dataList.length > this.showDataLength ? this.showDataLength : this.dataList.length
        for (let i = 0; i < length - 1; i++) {
          const d = this.dataList[i];
          if (d[this.y] >= maxValue) {
            maxValue = d[this.y];
            maxObj = d;
          }
          if (d[this.y] < minValue) {
            minValue = d[this.y];
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
        const length = this.dataList.length > this.showDataLength ? this.showDataLength : this.dataList.length
        for (let i = 0; i < length - 1; i++) {
          const d = this.dataList[i];
          if (d[this.groupName] === e) {
            if (d[this.y] >= maxValue) {
              maxValue = d[this.y];
              maxObj = d;
            }
            if (d[this.y] < minValue) {
              minValue = d[this.y];
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
  }

  // 动态轮播最大值最小值计算
  public findMax(element?) {
    if (element) {
      let maxValue = 0;
      let maxObj = null;
      for (const item of this.showdata) {
        let d = item;
        if (d[this.groupName] === element && d[this.y] >= maxValue) {
          maxValue = d[this.y];
          maxObj = d;
        }
      }
      return maxObj;
    } else {
      let maxValue = 0;
      let maxObj = null;
      for (const item of this.showdata) {
        let d = item;
        if (d[this.y] >= maxValue) {
          maxValue = d[this.y];
          maxObj = d;
        }
      }
      return maxObj;
    }
  }

  public findMin(element?) {
    if (element) {
      let minValue = 50000;
      let minObj = null;
      for (const item of this.showdata) {
        const d = item;
        if (d[this.groupName] === element && d[this.y] <= minValue) {
          minValue = d[this.y];
          minObj = d;
        }
      }
      return minObj;
    } else {
      let minValue = 50000;
      let minObj = null;
      for (const item of this.showdata) {
        const d = item;
        if (d[this.y] <= minValue) {
          minValue = d[this.y];
          minObj = d;
        }
      }
      return minObj;
    }
  }

  // 参数解析
  public buildParameters(paramsCfg, data?, isArray = false) {
    let parameterResult: any | any[];
    if (!isArray && !data) {
      parameterResult = CnParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue

      });
    } else if (!isArray && data) {
      parameterResult = CnParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        outputValue: data

      });
    } else if (isArray && data && Array.isArray(data)) {
      parameterResult = [];
      data.map(d => {
        const param = CnParameterResolver.resolve({
          params: paramsCfg,
          tempValue: this.tempValue,
          initValue: this.initValue,
          cacheValue: this.cacheValue,
          router: this.routerValue
        });
        parameterResult.push(param);
      })
    }
    return parameterResult;
  }

  // 显示消息框
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

  // 设置消息体内容
  public buildMessageContent(msgObj) {
    const message: any = {};
    const array = msgObj.message.split(':');
    if (!array) {
      if (msgObj.code) {
        message.message = msgObj.code;
      } else if (msgObj.message) {
        message.message = msgObj.message;
      }
      // message.message = option.code ? option.code : '';
      msgObj.field && (message.field = msgObj.field ? msgObj.field : '');
      message.type = msgObj.type;
    } else {
      message.type = array[0];
      message.message = array[1];
    }
    return message
  }

  /**
   * axisFormatter 坐标轴自定义初始化
   */
  public axisFormatter(axis, axisConfig, color?, temp?, formatter?) {
    const that = this;
    let format;
    if (axis === this.x) {
      format = {
        label: {
          formatter: val => {
            let xformat;
            this.stageCurrentDatalist.forEach(s => {
              if (s[that.start]) {
                if (s[that.end]) {
                  if (this.transStringTime(val) >= this.transStringTime(s[that.start]) && this.transStringTime(val) < this.transStringTime(s[that.end])) {
                    xformat = s['STAGE']
                  }
                } else {
                  if (this.transStringTime(val) >= this.transStringTime(s[that.start])) {
                    xformat = s['STAGE']
                  }
                }
              }
            });
            if (!xformat) {
              // xformat = 1;
              return val;
            } else {
              let stageName;
              if (this.rulenameList.length > 0) {
                this.rulenameList.forEach(e => {
                  if (e['STAGE'] === xformat) {
                    stageName = e['SHOW_NAME'];
                  }
                })
              }
              if (stageName) {
                return val + '  ' + stageName + '阶段';
              } else {
                return val + '  ' + '第' + xformat + '阶段'; // 格式化坐标轴显示文本
              }
            }
          },
        }
      }
    } else {
      if (formatter) {
        format = {
          label: {
            formatter: val => {
              return val + formatter; // 格式化坐标轴显示
            }
          }
        }
      }
    }
    axisConfig = { ...axisConfig, ...format }
    this.chart.axis(axis, axisConfig);
  }

  /**
   * createLineAndPoint 创建线和点
   */
  public createLineAndPoint() {
    for (let i = 0; i < this.yDataArray.length; i++) {
      this.chart.line().position(this.x + '*' + this.yDataArray[i].name).color(this.yDataArray[i].color).shape(this.config.shape ? this.config.shape : 'circle');
      if (this.config.chartConfig.showUserPoint) {
        if (this.config.chartConfig.guideConfig) {
          this.chart.point().position(this.x + '*' + this.yDataArray[i].name).size(4).shape('overyGuide').style({
            stroke: '#fff',
            lineWidth: 1,
            field: this.yDataArray[i].name,
            type: this.yDataArray[i].type
          });
        }
        if (this.config.chartConfig.ruleConfig && this.config.chartConfig.ruleConfig.rule) {
          this.chart.point().position(this.x + '*' + this.yDataArray[i].name).size(4).shape('overDataRule').style({
            stroke: '#fff',
            lineWidth: 1,
            type: this.yDataArray[i].type
          });
        }
      }
    }
  }
}
