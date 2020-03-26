import { getISOYear, getISOWeek, getMonth, getDate } from 'date-fns';

export class CnParameterBase {
    // 构建匹配参数
    public getParameter(conditionType, value) {
      let strQ = '';
      if (!value) {
        // return strQ;
      }
      switch (conditionType) {
        case 'eq': // =
          // strQ = strQ + 'eq( '+ value +' )';
          strQ = `${strQ}eq(${value})`;
          break;
        case 'neq': // !=
          // strQ = strQ + '!eq( + value + )';
          strQ = `${strQ}!eq(${value})`;
          break;
        case 'ctn': // like
          // strQ = strQ + "ctn(%" + value + "%)";
          strQ = `${strQ}ctn(%${value}%)`;
          break;
        case 'nctn': // not like
          // strQ = strQ + "!ctn(%" + value + "%)";
          strQ = `${strQ}!ctn(%${value}%)`;
          break;
        case 'in': // in  如果是input 是这样取值，其他则是多选取值
          // strQ = strQ + 'in( + value + )';
          strQ = `${strQ}in(${value})`;
          break;
        case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
          // strQ = strQ + '!in( + value + )';
          strQ = `${strQ}!in(${value})`;
          break;
        case 'btn': // between
          //  strQ = strQ + 'btn( + value + )';
          strQ = `${strQ}btn(${value})`;
          break;
        case 'ge': // >=
          // strQ = strQ + 'ge(' + value + ')';
          strQ = `${strQ}ge(${value})`;
          break;
        case 'gt': // >
          // strQ = strQ + 'gt(' + value + ')';
          strQ = `${strQ}gt(${value})`;
          break;
        case 'le': // <=
          // strQ = strQ + 'le(' + value + ')';
          strQ = `${strQ}le(${value})`;
          break;
        case 'lt': // <
          // strQ = strQ + 'lt(' + value + ')';
          strQ = `${strQ}lt(${value})`;
          break;
        default:
          strQ = value;
          break;
      }
  
      if (!value) {
        strQ = null;
      }
      return strQ;
    }
  
    // 获取默认时间(多语言存在问题)
    public getDefaultDate(dataType) {
      let dValue;
      switch (dataType) {
        case 'defaultWeek':
          dValue = `${getISOYear(Date.now())}-${getISOWeek(Date.now())}`;
          break;
        case 'defaultDate':
          dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}-${getDate(Date.now())}`;
          break;
        case 'defaultMonth':
          dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}`;
          break;
        case 'defaultYear':
          dValue = `${getISOYear(Date.now())}`;
          break;
      }
      return dValue;
    }
  }