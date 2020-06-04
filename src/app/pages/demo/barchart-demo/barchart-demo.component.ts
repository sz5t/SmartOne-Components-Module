import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart-demo',
  templateUrl: './barchart-demo.component.html',
  styles: [
    `
        :host ::ng-deep .ant-card-head {
            min-height: 36px;
        }

        .trigger {
            font-size: 20px;
            padding: 0 5px;
            cursor: pointer;
            transition: color 0.3;
            right:0px;
            position:relative;
            z-index:8;
            padding-top:8px;
        }
        .trigger:hover {
            color: #1890ff;
        }

        .collapsedArea {
            position:relative;

        }
    `
  ]
})
export class BarchartDemoComponent implements OnInit {

  public config = {
    "id": "4K0naM",
    "type": "layout",
    "title": "布局4K0naM",
    "container": "rows",
    "rows": [
      {
        "cols": [
          {
            "id": "r5zDHB2-1",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_02-01",
              "title": "柱状图",
              "titleIcon": "right-circle",
              "component": "cnBarchart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_BAR_CHART_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "VALUE DESC"
                  },
                  {
                    "name": "NAME_PERCENT",
                    "type": "value",
                    "value": "ne()"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 75,
                "guideText": "满足区间",
                "haveSubTitle": false,
                "subTitle": "finish",
                "subField": "percent",
                "haveColorSign": true,
                "signValue": 80,
                "signColor": "#ff4d4f",
                "BasiAttribute": {
                  "x": {
                    "name": "NAME",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "VALUE",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "max": 100
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-2",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_02-02",
              "title": "分组柱状图",
              "titleIcon": "right-circle",
              "component": "cnBarchart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_CHART_GROUP_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "VALUE DESC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 75,
                "guideText": "满足区间",
                "haveSubTitle": false,
                "subTitle": "finish",
                "subField": "percent",
                "haveColorSign": true,
                "signValue": 80,
                "signColor": "#ff4d4f",
                "BasiAttribute": {
                  "x": {
                    "name": "TYPE",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "VALUE",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "max": 100
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300,
                  "groupName": "NAME"
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-3",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_03-01",
              "title": "基础条形图",
              "titleIcon": "right-circle",
              "component": "cnHorizontalBarchart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_BAR_CHART_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "VALUE DESC"
                  },
                  {
                    "name": "NAME_PERCENT",
                    "type": "value",
                    "value": "ne()"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 75,
                "guideText": "满足区间",
                "haveSubTitle": false,
                "subTitle": "finish",
                "subField": "percent",
                "haveColorSign": true,
                "signValue": 80,
                "signColor": "#ff4d4f",
                "BasiAttribute": {
                  "x": {
                    "name": "NAME",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "VALUE",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "max": 100
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-4",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_03-02",
              "title": "分组条形图",
              "titleIcon": "right-circle",
              "component": "cnHorizontalBarchart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_CHART_GROUP_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "VALUE DESC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 75,
                "guideText": "满足区间",
                "haveSubTitle": false,
                "subTitle": "finish",
                "subField": "percent",
                "haveColorSign": true,
                "signValue": 80,
                "signColor": "#ff4d4f",
                "BasiAttribute": {
                  "x": {
                    "name": "NAME",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "VALUE",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "max": 100
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300,
                  "groupName": "TYPE"
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-5-1",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_04_01",
              "title": "基础折线图",
              "titleIcon": "right-circle",
              "component": "cnBrokenLineChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_BROKEN_LINE_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "YEAR ASC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 6,
                "guideText": "满足区间",
                "peakValue": true, // 显示最值的标记
                "showUserGuide": true, // 满足用户区域的图表换颜色
                "showUserPoint": true, // 满足用户区域的点标记
                "guideConfig": {
                  "url": "resource/GET_CHART_GUIDE_DATA/query",
                  "method": "get",
                  "params": [],
                  "filter": []
                },
                "guideBasicAttribute": {
                  "start": "X_START",
                  "end": "X_END",
                  "condition": "GUIDE_CONDITION",
                  "start_value": "START_VALUE",
                  "end_value": "END_VALUE",
                  "color": "COLOR"
                },
                "BasiAttribute": {
                  "x": {
                    "name": "YEAR",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "YEAR_VALUE",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "max": 16,
                      "tickCount": 9
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-5",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_04_02",
              "title": "分组折线图",
              "titleIcon": "right-circle",
              "component": "cnBrokenLineChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/CHART_GROUP_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "CREATE_DATE ASC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": false,
                "guideMin": 8,
                "guideText": "满足区间",
                "peakValue": false, // 显示最值的标记
                "showUserGuide": false, // 满足用户区域的图表换颜色
                "showUserPoint": false, // 满足用户区域的点标记
                "guideConfig": {
                  "url": "resource/GET_CHART_GUIDE_DATA/query",
                  "method": "get",
                  "params": [],
                  "filter": []
                },
                "guideBasicAttribute": {
                  "start": "X_START",
                  "end": "X_END",
                  "condition": "GUIDE_CONDITION",
                  "start_value": "START_VALUE",
                  "end_value": "END_VALUE",
                  "color": "COLOR"
                },
                "BasiAttribute": {
                  "x": {
                    "name": "MONTH",
                    "scale": {},
                    "axis": {
                      "label": {
                        "textStyle": {
                          "fill": '#aaaaaa'
                        }
                      },
                      "tickLine": {
                        "alignWithLabel": false,
                        "length": 0
                      }
                    }
                  },
                  "y": {
                    "name": "value",
                    "scale": {
                      "alias": "销售额（万）",
                      "min": 0,
                      "tickCount": 9
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300,
                  "transformData": true,
                  "groupFiled": "DOTA,LOL"
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-6",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_05_01",
              "title": "基础饼形图",
              "titleIcon": "right-circle",
              "component": "cnFanChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_FAN_CHART_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "COUNT DESC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "guideConfig": {
                  "url": "information/selectCityByProvinceIdPage",
                  "method": "get",
                  "params": [
                    {
                      "name": "pid",
                      "type": "tempValue",
                      "valueName": "_PID"
                    }
                  ],
                  "filter": []
                },
                "BasiAttribute": {
                  "percent": {
                    "name": "FAN_PERCENT"
                  },
                  "item": {
                    "name": "ITEM"
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300,
                  "ring": false
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-7",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 12,
            "container": "component",
            "size": {
              "nzXs": 12,
              "nzSm": 12,
              "nzMd": 12,
              "nzLg": 12,
              "nzXl": 12,
              "nzXXl": 12
            },
            "component": {
              "id": "view_05_01",
              "title": "分组饼形图",
              "titleIcon": "right-circle",
              "component": "cnFanChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/GET_FAN_CHART_GROUP_DATA/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "TYPE DESC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "BasiAttribute": {
                  "percent": {
                    "name": "FAN_PERCENT"
                  },
                  "item": {
                    "name": "ITEM"
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "height": 300,
                  "ring": false,
                  "calculateRatio": true,
                  "group": true,
                  "groupConfig": {
                    "inner": "TYPE",
                    "outer": "NAME"
                  }
                }
              },
              "cascade": {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-8",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "view_07",
              "title": "时间轴折线图",
              "titleIcon": "right-circle",
              "component": "cnTimeAxisChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/CHART_TIMELINE/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "TIME ASC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                "guideMin": 280,
                "guideText": "满足区间",
                "showUserGuide": true, // 满足用户区域的图表换颜色
                "showUserPoint": true, // 满足用户区域的点标记
                "showDataLength": 4, // 需要展示的数据源长度
                "autoPlay": false,// 自动刷新数据
                "guideConfig": {
                  "url": "resource/CHART_FZX/query",
                  "method": "get",
                  "params": [],
                  "filter": []
                },
                "guideBasicAttribute": {
                  "start": "START_TIME",
                  "end": "END_TIME",
                  "max": "MAXVALUE",
                  "min": "MINVALUE",
                  "color": "#FF0000",
                  "maxtext": "预警上限",
                  "mintext": "预警下限",
                  "guideFiled": "FILED"
                },
                "BasiAttribute": {
                  "x": {
                    "name": "TIME",
                    "scale": {
                      "range": [
                        0,
                        1
                      ],
                      "tickInterval": 300000,
                      "alias": "时间",
                      "type": "time",
                      "mask": "YYYY-MM-DD HH:mm:ss"
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      },
                      "subTickCount": 5,
                      "subTickLine": {
                        "length": 3,
                        "stroke": "#545454",
                        "lineWidth": 2
                      },
                      "tickLine": {
                        "length": 5,
                        "stroke": "#000",
                        "lineWidth": 1
                      }
                    }
                  },
                  "y": {
                    "name": "VALUE",
                    "scale": {
                      "alias": "监测值",
                      "tickInterval": 40,
                      "max": 320,
                      "min": 0
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "y1": {
                    "name": "PRESSURE",
                    "scale": {
                      "alias": "压力",
                      "tickInterval": 50,
                      "max": 400,
                      "min": 0,
                      "sync": true,
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      }
                    }
                  },
                  "legend": {
                    "position": "top-center"
                  },
                  "formatConfig": {
                    "x": {
                      "url": "resource/CHART_RULE_NAME/query",
                      "ajaxType": "get",
                      "params": []
                    },
                    "y": {},
                    "y1": {}
                  },
                  "height": 300,
                  "overid": "chartOver",
                },
                "overConfig": [{
                  "id": "chartOver",
                  "y": "#008000", // 超过Y左轴辅助线颜色：墨绿，ok
                  "y1": "#FF6600", // 超过Y右轴辅助线颜色：橙
                  "filed": "RULE_VALUE", // 规则表里面填规则值的字段
                  "yRule": "#CC0000", // 不符合Y左轴的规则的点颜色：红，ok
                  "y1Rule": "#660066" // 不符合Y右轴的规则的点颜色：紫
                }],
                "ruleConfig": {
                  "url": "resource/CHART_RULES_DATA/query",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "NUMBER asc"
                    }
                  ]
                },
                "stageRuleConfig": {
                  "url": "resource/CHART_STAGE_RULE/query",
                  "stageFiled": "STAGE",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "STAGE asc"
                    }
                  ],
                  "operateConfig": {
                    "url": "resource/RecordStageInfoProc/operate",
                    "ajaxType": "post",
                    "urlType": "inner",
                    "params": [
                      {
                        "name": "chartId",
                        "type": "value",
                        "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                      }
                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterCitySaveSuccessfully"
                      }
                    ]
                  },
                  "finishConfig": {
                    "url": "resource/RecordStageInfoProcFinish/operate",
                    "ajaxType": "post",
                    "params": [
                      {
                        "name": "chartId",
                        "type": "value",
                        "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                      }
                    ]
                  }
                },
                "curStageConfig": {
                  "url": "resource/CHART_INFO_RECORD/query",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "STAGE asc"
                    }
                  ]
                },
                "ruleNameConfig": {
                  "url": "resource/CHART_RULE_NAME/query",
                  "method": "get",
                  "params": [
                    // {
                    //     "name": "chartId",
                    //     "type": "value",
                    //     "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                    // }
                  ]
                }
              },
              "cascade": {
                "messageSender": [
                  {
                    "id": "afterCitySaveSuccessfully",
                    "senderId": "view_07",
                    // "triggerType": "ACTION",
                    // "trigger": "MESSAGE",
                    // "triggerMoment": "after",
                    "sendData": [
                      {
                        "beforeSend": {},
                        "reveicerId": "",
                        "receiverTriggerType": "ACTION",
                        "receiverTrigger": "MESSAGE",
                        "params": [
                          {
                            "name": "message",
                            "type": "outputValue",
                            "valueName": "Message"
                          },
                        ]
                      }
                    ]
                  }
                ],
                "messageReceiver": [
                  // {
                  //     "id": "",
                  //     "senderId": "view_01",
                  //     "receiveData": [
                  //         {
                  //             "beforeReceive": [],
                  //             "triggerType": "BEHAVIOR",
                  //             "trigger": "REFRESH_AS_CHILD",
                  //             "params": [
                  //                 {
                  //                     "pname": "_PID",
                  //                     "cname": "_PID",
                  //                     "valueTo": "tempValue"
                  //                 }
                  //             ]
                  //         }
                  //     ]
                  // },
                  {
                    "id": "",
                    "senderId": "view_07",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "ACTION",
                        "trigger": "MESSAGE"
                        // "params": [
                        //     {
                        //         "pname": "name",
                        //         "cname": "_PID",
                        //         "valueTo": "tempValue"
                        //     }
                        // ]
                      }
                    ]
                  }

                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-9",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "view_07_02",
              "title": "多Y轴时间轴折线图",
              "titleIcon": "right-circle",
              "component": "cnMultipleYAxisChart",
              "keyId": "id",
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/CHART_DATA_TIMELINE/query",
                "method": "get",
                "params": [
                  {
                    "name": "_sort",
                    "type": "value",
                    "value": "TIME ASC"
                  }
                ],
                "filter": [

                ]
              },
              "chartConfig": {
                "haveGuide": true,
                // "guideMin": 280,
                "guideText": "满足区间",
                "showUserGuide": false, // 满足用户区域的图表换颜色
                "showUserPoint": true, // 满足用户区域的点标记
                "showDataLength": 7, // 需要展示的数据源长度
                "autoPlay": false,// 自动刷新数据
                "guideConfig": {
                  "pointColor": "#DC143C",
                  "url": "resource/CHART_FZX/query",
                  "method": "get",
                  "params": [],
                  "filter": []
                },
                "guideBasicAttribute": {
                  "start": "START_TIME",
                  "end": "END_TIME",
                  "max": "MAXVALUE",
                  "min": "MINVALUE"
                },
                "guideContent": [
                  {
                    "name": "VALUE",
                    "maxtext": "预警上限",
                    "mintext": "预警下限",
                    "textcolor": "#F5222D",
                    "guidelinecolor": "#F5222D"
                  },
                  {
                    "name": "PRESSURE",
                    "maxtext": "压力上限",
                    "mintext": "压力下限",
                    "textcolor": "#FF6600",
                    "guidelinecolor": "#FF6600"
                  }
                ],
                "BasiAttribute": {
                  "x": {
                    "name": "TIME",
                    "scale": {
                      "range": [
                        0,
                        1
                      ],
                      "tickInterval": 300000,
                      "alias": "时间",
                      "type": "time",
                      "mask": "YYYY-MM-DD HH:mm:ss"
                    },
                    "axis": {
                      "title": {
                        "offset": 50
                      },
                      "subTickCount": 5,
                      "subTickLine": {
                        "length": 3,
                        "stroke": "#545454",
                        "lineWidth": 2
                      },
                      "tickLine": {
                        "length": 5,
                        "stroke": "#000",
                        "lineWidth": 1
                      }
                    }
                  },
                  "yDataArray": [
                    {
                      "name": "VALUE",
                      "scale": {
                        "alias": "温度",
                        "tickInterval": 40,
                        "max": 320,
                        "min": 0
                      },
                      "axis": {
                        "title": {
                          "offset": 60
                        },
                        "line": null,
                        "tickLine": null,
                        "position": "left",
                        "label": {
                          "offset": 20,
                          "textStyle": {
                            "fill": "#0066FF"
                          }
                        }
                      },
                      "color": "#0066FF",
                      "type": "VALUE"
                    },
                    {
                      "name": "VALUE1",
                      "scale": {
                        "alias": "温度1",
                        "tickInterval": 70,
                        "max": 320,
                        "min": 0
                      },
                      "axis": {
                        "title": {
                          "offset": 110
                        },
                        "line": null,
                        "tickLine": null,
                        "position": "left",
                        "label": {
                          "offset": 70,
                          "textStyle": {
                            "fill": "#33CC00"
                          }
                        }
                      },
                      "color": "#33CC00",
                      "type": "VALUE"
                    },
                    {
                      "name": "PRESSURE",
                      "scale": {
                        "alias": "真空度",
                        "tickInterval": 40,
                        "min": 0
                      },
                      "axis": {
                        "title": {
                          "offset": 50
                        },
                        "line": null,
                        "tickLine": null,
                        "label": {
                          "offset": 20,
                          "textStyle": {
                            "fill": "#FF6600"
                          }
                        }
                      },
                      "color": "#FF6600",
                      "type": "PRESSURE"
                    }
                  ],
                  "legend": {
                    "position": "top-center"
                  },
                  "formatConfig": {
                    "x": {
                      "url": "resource/CHART_RULE_NAME/query",
                      "ajaxType": "get",
                      "params": []
                    },
                    "y": {},
                    "y1": {}
                  },
                  "height": 300
                },
                "ruleConfig": {
                  "pointColor": "#008000",
                  "rule": true,
                  "url": "resource/CHART_RULES_DATA/query",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "NUMBER asc"
                    }
                  ]
                },
                "stageRuleConfig": {
                  "url": "resource/CHART_STAGE_RULE/query",
                  "stageFiled": "STAGE",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "STAGE asc"
                    }
                  ],
                  "operateConfig": {
                    "url": "resource/RecordStageInfoProc/operate",
                    "ajaxType": "post",
                    "urlType": "inner",
                    "params": [
                      {
                        "name": "chartId",
                        "type": "value",
                        "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                      }
                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterCitySaveSuccessfully"
                      }
                    ]
                  },
                  "finishConfig": {
                    "url": "resource/RecordStageInfoProcFinish/operate",
                    "ajaxType": "post",
                    "params": [
                      {
                        "name": "chartId",
                        "type": "value",
                        "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                      }
                    ]
                  }
                },
                "curStageConfig": {
                  "url": "resource/CHART_INFO_RECORD/query",
                  "method": "get",
                  "params": [
                    {
                      "name": "_sort",
                      "type": "value",
                      "value": "STAGE asc"
                    }
                  ]
                },
                "ruleNameConfig": {
                  "url": "resource/CHART_RULE_NAME/query",
                  "method": "get",
                  "params": [
                    // {
                    //     "name": "chartId",
                    //     "type": "value",
                    //     "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                    // }
                  ]
                }
              },
              "cascade": {
                "messageSender": [
                  {
                    "id": "afterCitySaveSuccessfully",
                    "senderId": "view_07",
                    // "triggerType": "ACTION",
                    // "trigger": "MESSAGE",
                    // "triggerMoment": "after",
                    "sendData": [
                      {
                        "beforeSend": {},
                        "reveicerId": "",
                        "receiverTriggerType": "ACTION",
                        "receiverTrigger": "MESSAGE",
                        "params": [
                          {
                            "name": "message",
                            "type": "outputValue",
                            "valueName": "Message"
                          },
                        ]
                      }
                    ]
                  }
                ],
                "messageReceiver": [
                  // {
                  //     "id": "",
                  //     "senderId": "view_01",
                  //     "receiveData": [
                  //         {
                  //             "beforeReceive": [],
                  //             "triggerType": "BEHAVIOR",
                  //             "trigger": "REFRESH_AS_CHILD",
                  //             "params": [
                  //                 {
                  //                     "pname": "_PID",
                  //                     "cname": "_PID",
                  //                     "valueTo": "tempValue"
                  //                 }
                  //             ]
                  //         }
                  //     ]
                  // },
                  {
                    "id": "",
                    "senderId": "view_07_02",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "ACTION",
                        "trigger": "MESSAGE"
                        // "params": [
                        //     {
                        //         "pname": "name",
                        //         "cname": "_PID",
                        //         "valueTo": "tempValue"
                        //     }
                        // ]
                      }
                    ]
                  }

                ]
              },
              "condition": [
              ],
              "ajaxConfig": [
              ]
            }
          },
          {
            "id": "r5zDHB2-10",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "view_07_03",
              "loadingOnInit": true,
              "component": "cnCharts",
              "formControls": [
                {
                  "id": '001',
                  "config": {
                    "title": "柱状图",
                    "titleIcon": "right-circle",
                    "type": "barchart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/GET_BAR_CHART_DATA/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "VALUE DESC"
                        },
                        {
                          "name": "NAME_PERCENT",
                          "type": "value",
                          "value": "ne()"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "haveGuide": true,
                      "guideMin": 75,
                      "guideText": "满足区间",
                      "haveSubTitle": false,
                      "subTitle": "finish",
                      "subField": "percent",
                      "haveColorSign": true,
                      "signValue": 80,
                      "signColor": "#ff4d4f",
                      "BasiAttribute": {
                        "x": {
                          "name": "NAME",
                          "scale": {},
                          "axis": {
                            "label": {
                              "textStyle": {
                                "fill": '#aaaaaa'
                              }
                            },
                            "tickLine": {
                              "alignWithLabel": false,
                              "length": 0
                            }
                          }
                        },
                        "y": {
                          "name": "VALUE",
                          "scale": {
                            "alias": "销售额（万）",
                            "min": 0,
                            "max": 100
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            }
                          }
                        },
                        "legend": {
                          "position": "top-center"
                        },
                        "height": 300
                      }
                    },
                    "cascade": {
                      "messageReceiver": [
                        {
                          "id": "",
                          "senderId": "view_01",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "BEHAVIOR",
                              "trigger": "REFRESH_AS_CHILD",
                              "params": [
                                {
                                  "pname": "_PID",
                                  "cname": "_PID",
                                  "valueTo": "tempValue"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                },
                {
                  "id": '002',
                  "config": {
                    "title": "基础饼形图",
                    "titleIcon": "right-circle",
                    "type": "fanchart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/GET_FAN_CHART_DATA/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "COUNT DESC"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "guideConfig": {
                        "url": "information/selectCityByProvinceIdPage",
                        "method": "get",
                        "params": [
                          {
                            "name": "pid",
                            "type": "tempValue",
                            "valueName": "_PID"
                          }
                        ],
                        "filter": []
                      },
                      "BasiAttribute": {
                        "percent": {
                          "name": "FAN_PERCENT"
                        },
                        "item": {
                          "name": "ITEM"
                        },
                        "legend": {
                          "position": "top-center"
                        },
                        "height": 300,
                        "ring": false
                      }
                    },
                    "cascade": {
                      "messageReceiver": [
                        {
                          "id": "",
                          "senderId": "view_01",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "BEHAVIOR",
                              "trigger": "REFRESH_AS_CHILD",
                              "params": [
                                {
                                  "pname": "_PID",
                                  "cname": "_PID",
                                  "valueTo": "tempValue"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                },
                {
                  "id": '003',
                  "config": {
                    "title": "基础条形图",
                    "titleIcon": "right-circle",
                    "type": "horizontalbarchart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/GET_BAR_CHART_DATA/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "VALUE DESC"
                        },
                        {
                          "name": "NAME_PERCENT",
                          "type": "value",
                          "value": "ne()"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "haveGuide": true,
                      "guideMin": 75,
                      "guideText": "满足区间",
                      "haveSubTitle": false,
                      "subTitle": "finish",
                      "subField": "percent",
                      "haveColorSign": true,
                      "signValue": 80,
                      "signColor": "#ff4d4f",
                      "BasiAttribute": {
                        "x": {
                          "name": "NAME",
                          "scale": {},
                          "axis": {
                            "label": {
                              "textStyle": {
                                "fill": '#aaaaaa'
                              }
                            },
                            "tickLine": {
                              "alignWithLabel": false,
                              "length": 0
                            }
                          }
                        },
                        "y": {
                          "name": "VALUE",
                          "scale": {
                            "alias": "销售额（万）",
                            "min": 0,
                            "max": 100
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            }
                          }
                        },
                        "legend": {
                          "position": "top-center"
                        },
                        "height": 300
                      }
                    },
                    "cascade": {
                      "messageReceiver": [
                        {
                          "id": "",
                          "senderId": "view_01",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "BEHAVIOR",
                              "trigger": "REFRESH_AS_CHILD",
                              "params": [
                                {
                                  "pname": "_PID",
                                  "cname": "_PID",
                                  "valueTo": "tempValue"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                },
                {
                  "id": '004',
                  "config": {
                    "title": "基础折线图",
                    "titleIcon": "right-circle",
                    "type": "brokenlinechart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/GET_BROKEN_LINE_DATA/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "YEAR ASC"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "haveGuide": true,
                      "guideMin": 6,
                      "guideText": "满足区间",
                      "peakValue": true, // 显示最值的标记
                      "showUserGuide": true, // 满足用户区域的图表换颜色
                      "showUserPoint": true, // 满足用户区域的点标记
                      "guideConfig": {
                        "url": "resource/GET_CHART_GUIDE_DATA/query",
                        "method": "get",
                        "params": [],
                        "filter": []
                      },
                      "guideBasicAttribute": {
                        "start": "X_START",
                        "end": "X_END",
                        "condition": "GUIDE_CONDITION",
                        "start_value": "START_VALUE",
                        "end_value": "END_VALUE",
                        "color": "COLOR"
                      },
                      "BasiAttribute": {
                        "x": {
                          "name": "YEAR",
                          "scale": {},
                          "axis": {
                            "label": {
                              "textStyle": {
                                "fill": '#aaaaaa'
                              }
                            },
                            "tickLine": {
                              "alignWithLabel": false,
                              "length": 0
                            }
                          }
                        },
                        "y": {
                          "name": "YEAR_VALUE",
                          "scale": {
                            "alias": "销售额（万）",
                            "min": 0,
                            "max": 16,
                            "tickCount": 9
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            }
                          }
                        },
                        "legend": {
                          "position": "top-center"
                        },
                        "height": 300
                      }
                    },
                    "cascade": {
                      "messageReceiver": [
                        {
                          "id": "",
                          "senderId": "view_01",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "BEHAVIOR",
                              "trigger": "REFRESH_AS_CHILD",
                              "params": [
                                {
                                  "pname": "_PID",
                                  "cname": "_PID",
                                  "valueTo": "tempValue"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                },
                {
                  "id": "005",
                  "config": {
                    "title": "时间轴折线图",
                    "titleIcon": "right-circle",
                    "type": "timeaxischart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/CHART_TIMELINE/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "TIME ASC"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "haveGuide": true,
                      "guideMin": 280,
                      "guideText": "满足区间",
                      "showUserGuide": true, // 满足用户区域的图表换颜色
                      "showUserPoint": true, // 满足用户区域的点标记
                      "showDataLength": 4, // 需要展示的数据源长度
                      "autoPlay": false,// 自动刷新数据
                      "guideConfig": {
                        "url": "resource/CHART_FZX/query",
                        "method": "get",
                        "params": [],
                        "filter": []
                      },
                      "guideBasicAttribute": {
                        "start": "START_TIME",
                        "end": "END_TIME",
                        "max": "MAXVALUE",
                        "min": "MINVALUE",
                        "color": "#FF0000",
                        "maxtext": "预警上限",
                        "mintext": "预警下限",
                        "guideFiled": "FILED"
                      },
                      "BasiAttribute": {
                        "x": {
                          "name": "TIME",
                          "scale": {
                            "range": [
                              0,
                              1
                            ],
                            "tickInterval": 300000,
                            "alias": "时间",
                            "type": "time",
                            "mask": "YYYY-MM-DD HH:mm:ss"
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            },
                            "subTickCount": 5,
                            "subTickLine": {
                              "length": 3,
                              "stroke": "#545454",
                              "lineWidth": 2
                            },
                            "tickLine": {
                              "length": 5,
                              "stroke": "#000",
                              "lineWidth": 1
                            }
                          }
                        },
                        "y": {
                          "name": "VALUE",
                          "scale": {
                            "alias": "监测值",
                            "tickInterval": 40,
                            "max": 320,
                            "min": 0
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            }
                          }
                        },
                        "y1": {
                          "name": "PRESSURE",
                          "scale": {
                            "alias": "压力",
                            "tickInterval": 50,
                            "max": 400,
                            "min": 0,
                            "sync": true,
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            }
                          }
                        },
                        "legend": {
                          "position": "top-center"
                        },
                        "formatConfig": {
                          "x": {
                            "url": "resource/CHART_RULE_NAME/query",
                            "ajaxType": "get",
                            "params": []
                          },
                          "y": {},
                          "y1": {}
                        },
                        "height": 300,
                        "overid": "chartOver",
                      },
                      "overConfig": [{
                        "id": "chartOver",
                        "y": "#008000", // 超过Y左轴辅助线颜色：墨绿，ok
                        "y1": "#FF6600", // 超过Y右轴辅助线颜色：橙
                        "filed": "RULE_VALUE", // 规则表里面填规则值的字段
                        "yRule": "#CC0000", // 不符合Y左轴的规则的点颜色：红，ok
                        "y1Rule": "#660066" // 不符合Y右轴的规则的点颜色：紫
                      }],
                      "ruleConfig": {
                        "url": "resource/CHART_RULES_DATA/query",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "NUMBER asc"
                          }
                        ]
                      },
                      "stageRuleConfig": {
                        "url": "resource/CHART_STAGE_RULE/query",
                        "stageFiled": "STAGE",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "STAGE asc"
                          }
                        ],
                        "operateConfig": {
                          "url": "resource/RecordStageInfoProc/operate",
                          "ajaxType": "post",
                          "urlType": "inner",
                          "params": [
                            {
                              "name": "chartId",
                              "type": "value",
                              "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                            }
                          ],
                          "result": [
                            {
                              "name": "data",
                              "showMessageWithNext": 0,
                              "message": "message.ajax.state.success",
                              "senderId": "afterCitySaveSuccessfully"
                            }
                          ]
                        },
                        "finishConfig": {
                          "url": "resource/RecordStageInfoProcFinish/operate",
                          "ajaxType": "post",
                          "params": [
                            {
                              "name": "chartId",
                              "type": "value",
                              "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                            }
                          ]
                        }
                      },
                      "curStageConfig": {
                        "url": "resource/CHART_INFO_RECORD/query",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "STAGE asc"
                          }
                        ]
                      },
                      "ruleNameConfig": {
                        "url": "resource/CHART_RULE_NAME/query",
                        "method": "get",
                        "params": [
                          // {
                          //     "name": "chartId",
                          //     "type": "value",
                          //     "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                          // }
                        ]
                      }
                    },
                    "cascade": {
                      "messageSender": [
                        {
                          "id": "afterCitySaveSuccessfully",
                          "senderId": "view_07",
                          // "triggerType": "ACTION",
                          // "trigger": "MESSAGE",
                          // "triggerMoment": "after",
                          "sendData": [
                            {
                              "beforeSend": {},
                              "reveicerId": "",
                              "receiverTriggerType": "ACTION",
                              "receiverTrigger": "MESSAGE",
                              "params": [
                                {
                                  "name": "message",
                                  "type": "outputValue",
                                  "valueName": "Message"
                                },
                              ]
                            }
                          ]
                        }
                      ],
                      "messageReceiver": [
                        // {
                        //     "id": "",
                        //     "senderId": "view_01",
                        //     "receiveData": [
                        //         {
                        //             "beforeReceive": [],
                        //             "triggerType": "BEHAVIOR",
                        //             "trigger": "REFRESH_AS_CHILD",
                        //             "params": [
                        //                 {
                        //                     "pname": "_PID",
                        //                     "cname": "_PID",
                        //                     "valueTo": "tempValue"
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // },
                        {
                          "id": "",
                          "senderId": "view_07",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "ACTION",
                              "trigger": "MESSAGE"
                              // "params": [
                              //     {
                              //         "pname": "name",
                              //         "cname": "_PID",
                              //         "valueTo": "tempValue"
                              //     }
                              // ]
                            }
                          ]
                        }

                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                },
                {
                  "id": "006",
                  "config": {
                    "title": "多Y轴时间轴折线图",
                    "titleIcon": "right-circle",
                    "type": "multipleYaxischart",
                    "keyId": "id",
                    "loadingOnInit": true,
                    "loadingConfig": {
                      "url": "resource/CHART_DATA_TIMELINE/query",
                      "method": "get",
                      "params": [
                        {
                          "name": "_sort",
                          "type": "value",
                          "value": "TIME ASC"
                        }
                      ],
                      "filter": [

                      ]
                    },
                    "chartConfig": {
                      "haveGuide": true,
                      // "guideMin": 280,
                      "guideText": "满足区间",
                      "showUserGuide": false, // 满足用户区域的图表换颜色
                      "showUserPoint": true, // 满足用户区域的点标记
                      "showDataLength": 7, // 需要展示的数据源长度
                      "autoPlay": false,// 自动刷新数据
                      "guideConfig": {
                        "pointColor": "#DC143C",
                        "url": "resource/CHART_FZX/query",
                        "method": "get",
                        "params": [],
                        "filter": []
                      },
                      "guideBasicAttribute": {
                        "start": "START_TIME",
                        "end": "END_TIME",
                        "max": "MAXVALUE",
                        "min": "MINVALUE"
                      },
                      "guideContent": [
                        {
                          "name": "VALUE",
                          "maxtext": "预警上限",
                          "mintext": "预警下限",
                          "textcolor": "#F5222D",
                          "guidelinecolor": "#F5222D"
                        },
                        {
                          "name": "PRESSURE",
                          "maxtext": "压力上限",
                          "mintext": "压力下限",
                          "textcolor": "#FF6600",
                          "guidelinecolor": "#FF6600"
                        }
                      ],
                      "BasiAttribute": {
                        "x": {
                          "name": "TIME",
                          "scale": {
                            "range": [
                              0,
                              1
                            ],
                            "tickInterval": 300000,
                            "alias": "时间",
                            "type": "time",
                            "mask": "YYYY-MM-DD HH:mm:ss"
                          },
                          "axis": {
                            "title": {
                              "offset": 50
                            },
                            "subTickCount": 5,
                            "subTickLine": {
                              "length": 3,
                              "stroke": "#545454",
                              "lineWidth": 2
                            },
                            "tickLine": {
                              "length": 5,
                              "stroke": "#000",
                              "lineWidth": 1
                            }
                          }
                        },
                        "yDataArray": [
                          {
                            "name": "VALUE",
                            "scale": {
                              "alias": "温度",
                              "tickInterval": 40,
                              "max": 320,
                              "min": 0
                            },
                            "axis": {
                              "title": {
                                "offset": 60
                              },
                              "line": null,
                              "tickLine": null,
                              "position": "left",
                              "label": {
                                "offset": 20,
                                "textStyle": {
                                  "fill": "#0066FF"
                                }
                              }
                            },
                            "color": "#0066FF",
                            "type": "VALUE"
                          },
                          {
                            "name": "VALUE1",
                            "scale": {
                              "alias": "温度1",
                              "tickInterval": 70,
                              "max": 320,
                              "min": 0
                            },
                            "axis": {
                              "title": {
                                "offset": 110
                              },
                              "line": null,
                              "tickLine": null,
                              "position": "left",
                              "label": {
                                "offset": 70,
                                "textStyle": {
                                  "fill": "#33CC00"
                                }
                              }
                            },
                            "color": "#33CC00",
                            "type": "VALUE"
                          },
                          {
                            "name": "PRESSURE",
                            "scale": {
                              "alias": "真空度",
                              "tickInterval": 40,
                              "min": 0
                            },
                            "axis": {
                              "title": {
                                "offset": 50
                              },
                              "line": null,
                              "tickLine": null,
                              "label": {
                                "offset": 20,
                                "textStyle": {
                                  "fill": "#FF6600"
                                }
                              }
                            },
                            "color": "#FF6600",
                            "type": "PRESSURE"
                          }
                        ],
                        "legend": {
                          "position": "top-center"
                        },
                        "formatConfig": {
                          "x": {
                            "url": "resource/CHART_RULE_NAME/query",
                            "ajaxType": "get",
                            "params": []
                          },
                          "y": {},
                          "y1": {}
                        },
                        "height": 300
                      },
                      "ruleConfig": {
                        "pointColor": "#008000",
                        "rule": true,
                        "url": "resource/CHART_RULES_DATA/query",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "NUMBER asc"
                          }
                        ]
                      },
                      "stageRuleConfig": {
                        "url": "resource/CHART_STAGE_RULE/query",
                        "stageFiled": "STAGE",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "STAGE asc"
                          }
                        ],
                        "operateConfig": {
                          "url": "resource/RecordStageInfoProc/operate",
                          "ajaxType": "post",
                          "urlType": "inner",
                          "params": [
                            {
                              "name": "chartId",
                              "type": "value",
                              "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                            }
                          ],
                          "result": [
                            {
                              "name": "data",
                              "showMessageWithNext": 0,
                              "message": "message.ajax.state.success",
                              "senderId": "afterCitySaveSuccessfully"
                            }
                          ]
                        },
                        "finishConfig": {
                          "url": "resource/RecordStageInfoProcFinish/operate",
                          "ajaxType": "post",
                          "params": [
                            {
                              "name": "chartId",
                              "type": "value",
                              "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                            }
                          ]
                        }
                      },
                      "curStageConfig": {
                        "url": "resource/CHART_INFO_RECORD/query",
                        "method": "get",
                        "params": [
                          {
                            "name": "_sort",
                            "type": "value",
                            "value": "STAGE asc"
                          }
                        ]
                      },
                      "ruleNameConfig": {
                        "url": "resource/CHART_RULE_NAME/query",
                        "method": "get",
                        "params": [
                          // {
                          //     "name": "chartId",
                          //     "type": "value",
                          //     "value": "35BF6DD4D76B48FB9966600C3E56F63C"
                          // }
                        ]
                      }
                    },
                    "cascade": {
                      "messageSender": [
                        {
                          "id": "afterCitySaveSuccessfully",
                          "senderId": "view_07",
                          // "triggerType": "ACTION",
                          // "trigger": "MESSAGE",
                          // "triggerMoment": "after",
                          "sendData": [
                            {
                              "beforeSend": {},
                              "reveicerId": "",
                              "receiverTriggerType": "ACTION",
                              "receiverTrigger": "MESSAGE",
                              "params": [
                                {
                                  "name": "message",
                                  "type": "outputValue",
                                  "valueName": "Message"
                                },
                              ]
                            }
                          ]
                        }
                      ],
                      "messageReceiver": [
                        // {
                        //     "id": "",
                        //     "senderId": "view_01",
                        //     "receiveData": [
                        //         {
                        //             "beforeReceive": [],
                        //             "triggerType": "BEHAVIOR",
                        //             "trigger": "REFRESH_AS_CHILD",
                        //             "params": [
                        //                 {
                        //                     "pname": "_PID",
                        //                     "cname": "_PID",
                        //                     "valueTo": "tempValue"
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // },
                        {
                          "id": "",
                          "senderId": "view_07_02",
                          "receiveData": [
                            {
                              "beforeReceive": [],
                              "triggerType": "ACTION",
                              "trigger": "MESSAGE"
                              // "params": [
                              //     {
                              //         "pname": "name",
                              //         "cname": "_PID",
                              //         "valueTo": "tempValue"
                              //     }
                              // ]
                            }
                          ]
                        }

                      ]
                    },
                    "condition": [
                    ],
                    "ajaxConfig": [
                    ]
                  }
                }
              ],
              "chartLayout": {
                "id": "b86s2i",
                "type": "layout",
                "title": "chart布局b86s2i",
                "rows": [
                  {
                    "id": "MefhXa",
                    "type": "row",
                    // 行列，是否 显示。
                    "cols": [
                      {
                        "id": "iHspYn", "col": "cc", "type": "col",
                        "title": "列iHspYn", "span": 12,
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": {
                          "id": "001"  // id 和引用id 值相同
                        }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24,
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "002" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12,
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "003" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12,
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "004" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24,
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "005" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24,
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "006" }
                      }
                    ]
                  }]
              }
            }
          }
        ],
        id: "3vlDRq",
        type: "row"
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
