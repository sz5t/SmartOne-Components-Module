
import { Directive, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CnBarchartComponent } from './cn-barchart/cn-barchart.component';
import { CnHorizontalBarchartComponent } from './cn-horizontal-barchart/cn-horizontal-barchart.component';
import { CnBrokenLineChartComponent } from './cn-broken-line-chart/cn-broken-line-chart.component';
import { CnFanChartComponent } from './cn-fan-chart/cn-fan-chart.component';
import { CnTimeAxisChartComponent } from './cn-time-axis-chart/cn-time-axis-chart.component';
import { CnMultipleYAxisChartComponent } from './cn-multiple-y-axis-chart/cn-multiple-y-axis-chart.component';

const components: { [type: string]: Type<any> } = {
  barchart: CnBarchartComponent,
  horizontalbarchart: CnHorizontalBarchartComponent,
  brokenlinechart: CnBrokenLineChartComponent,
  fanchart: CnFanChartComponent,
  timeaxischart: CnTimeAxisChartComponent,
  multipleYaxischart: CnMultipleYAxisChartComponent,
};

@Directive({
  selector: '[CnChartsDirective]'
})
export class CnChartsDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public config;
  @Input() public formCascade;
  @Input() public formState;

  public component: ComponentRef<any>;
  public componentConfig;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {

  }

  public ngOnInit() {
    // console.log('**********', this.config, this.formCascade)
    let _config;
    _config = this.config.config;
    this.componentConfig = _config;
    if (!components[_config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `不支持此类型的组件 (${
        _config.type
        }).可支持的类型为: ${supportedTypes}`
      );
    }
    this.container.clear();
    const comp = this.resolver.resolveComponentFactory<any>(
      components[_config.type]
    );

    this.component = this.container.createComponent(comp);
    // this.component.instance.formGroup = this.formGroup;
    this.component.instance.config = _config;
    // 级联数据接受 liu
    if (this.component.instance.updateValue) {
      this.component.instance.updateValue.subscribe(event => {
        this.setValue(event);
      });
    }


    // console.log('创建表单内部组件。。。-----------------------------', this.formGroup);
  }

  // 组件将值写回、级联数据-》回写 
  public setValue(data?) {
    // this.updateValue.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('****ngOnChanges******', changes, this.formGroup)
    // ngOnChanges只有在输入值改变的时候才会触发，
    // 如果输入值(@Input)是一个对象，改变对象内的属性的话是不会触发ngOnChanges的。
    // 部分级联需要此处中转，主要是参数等，取值赋值，隐藏显示等功能需要form表单处理。
    if (changes.hasOwnProperty('formCascade')) {
      if (!changes['formCascade'].firstChange) { // 处理后续变化，初始变化不处理
        if (this.formCascade) {
          console.log('触发级联', this.formCascade, this.componentConfig);

        }
        //  console.log('****formCascade******', this.formCascade, this.config.field);
        // console.log('ngOnChanges中inputVal变更前值为：' + changes['formCascade'].previousValue);
        //  console.log('ngOnChanges中inputVal变更后值为：' + changes['formCascade'].currentValue);
        //  console.log('ngOnChanges中inputVal是否是一次改变：' + changes['formCascade'].firstChange);
        // 将当前级联参数传递到相应的应答组件内部
        this.component.instance.cascadeAnalysis(this.formCascade);
      }
    }
    if (changes.hasOwnProperty('formState')) {
      if (!changes['formState'].firstChange) {
        console.log('****formState******', this.config.field, this.formState);
        // console.log('****formState******',this.config.field, this.value,this.formState, this.config, JSON.stringify(this.formGroup.value));
        let _config
        if (this.config.state === 'text') {
          _config = JSON.parse(JSON.stringify(this.config.text));
        }
        if (this.config.state === 'edit') {
          _config = JSON.parse(JSON.stringify(this.config.editor));
        }
        _config['config'] = JSON.parse(JSON.stringify(this.config));
        this.componentConfig = _config;
        if (!components[_config.type]) {
          const supportedTypes = Object.keys(components).join(', ');
          throw new Error(
            `不支持此类型的组件 (${
            _config.type
            }).可支持的类型为: ${supportedTypes}`
          );
        }
        this.container.clear();
        const comp = this.resolver.resolveComponentFactory<any>(
          components[_config.type]
        );

        this.component = this.container.createComponent(comp);
        // this.component.instance.formGroup = this.formGroup;
        this.component.instance.config = _config;
        // 级联数据接受 liu
        if (this.component.instance.updateValue) {
          this.component.instance.updateValue.subscribe(event => {
            this.setValue(event);
          });
        }
        // if(this.config.field ==='inputname4')
        // this.formGroup.setValue(this.value);
      }
    }

  }
  // Angular定义SimpleChanges类构造函数三个参数分别为上一个值，当前值和是否第一次变化(firstChange: boolean)，这些changes都可以调用。

  public ngOnDestroy() {
    if (this.component) {
      this.component.destroy();
    }
  }

}

