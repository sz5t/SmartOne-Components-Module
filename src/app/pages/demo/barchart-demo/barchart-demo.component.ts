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
            "id": "r5zDHB2-5",
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
              "id": "view_04",
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
                "guideMin": 8,
                "guideText": "满足区间",
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
              "id": "view_05",
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
              "id": "view_06",
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
