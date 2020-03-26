import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cn-layout',
  templateUrl: './cn-layout.component.html',
  styleUrls: ['./cn-layout.component.less']
})
export class CnLayoutComponent implements OnInit {
  public config;
  @Input() public initData;
  @Input() public tempData;
  constructor() { }

  ngOnInit() {
  }

}
