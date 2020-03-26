import { CnLayoutColumns } from './cn-columns.layout';
import { IResolver } from '../base/cn-resolver.interface';
import { CnLayoutBase } from './cn-layout.base';
import { CnLayoutRow } from './cn-row.layout';
import { LayoutSize } from './cn-size.layout';
import { CnLayoutTabs } from './cn-tabs.layout';
import { CnPageHeaderLayout } from './cn-page-header.layout';

export class CnLayoutResolver implements IResolver {
    resolve(cfg?: any) {
        if(cfg && cfg.container) {
            switch (cfg.container) {
                case 'rows':
                    return this.buildNormalObj(cfg);
                case 'tabContent':
                    return this.buildTabsObj(cfg);
                case 'pageHeader': 
                    return this.buildPageHeaderObj(cfg);
                case 'layout':
                    return this.resolve(cfg);
            }
        } else {
            // console.log(error);
        }
    }

    public buildNormalObj(cfg: any): CnLayoutBase {
        const layout = new CnLayoutBase();
        layout.container = cfg.container;
        layout.rows = [];
        if(Array.isArray(cfg.rows) && cfg.rows.length > 0) {
            for(const row of cfg.rows) {
                const newRow = new CnLayoutRow(row.id, row.type, row.title);
                newRow.cols = [];
                if(Array.isArray(row.cols) && row.cols.length > 0) {
                    for(const c of row.cols) {
                        const newCol = new CnLayoutColumns();
                        newCol.id = c.id;
                        newCol.type = c.type;
                        newCol.title = c.title;
                        newCol.span = c.span;
                        newCol.noBorder = c.noBorder ? true : false;
                        newCol.bodyStyle = c.bodyStyle;
                        newCol.size = new LayoutSize(c.size);
                        newCol.container = c.container;
                        this.setContainer(newCol, c);
                        newRow.addChild(newCol);
                    }
                }
                layout.addChild(newRow);
            }
        } else {
            // console.log(error);
        }
        return layout;
    }

    public buildTabsObj(cfg: any) {
        const tabs = new CnLayoutTabs();
        tabs.container = cfg.container;
        tabs.tabContent = cfg.tabContent;
        tabs.tabActiveMapping = cfg.tabActiveMapping;
        return tabs;
    }

    public buildPageHeaderObj(cfg: any) {
        const newPageHeader = new CnPageHeaderLayout();
        newPageHeader.container = "pageHeader";
        newPageHeader.title = cfg.title;
        newPageHeader.subTitle = cfg.subTitle;
        newPageHeader.tagColor = cfg.tagColor;
        newPageHeader.tagText = cfg.tagText;
        newPageHeader.descColumnsCount = cfg.descColumnsCount;
        newPageHeader.operations = cfg.operations;
        newPageHeader.contentItems = cfg.contentItems;
        newPageHeader.extraItems = cfg.extraItems;
        newPageHeader.ajaxConfig = cfg.ajaxConfig;
        newPageHeader.cascade = cfg.casacde;
        newPageHeader.headerMapping = cfg.headMapping;
        newPageHeader.contentMapping = cfg.contentMapping;
        newPageHeader.footMapping = cfg.footMapping;
        newPageHeader.extraMapping = cfg.extraMapping;
        newPageHeader.defaultLoading = cfg.defaultLoading;
        newPageHeader.layout = cfg.layout;
        return newPageHeader;
    }

    private setContainer(containerObj, containerCfg) {
        switch (containerObj.container) {
            case 'layout':
                containerObj.layout = containerCfg.layout;
                break;
            case 'tabs':
                containerObj.tabs = containerCfg.tabs;
                break;
            case 'pageHeader':
                containerObj.pageHeader = containerCfg.pageHeader;
                break;
            case 'component':
                containerObj.component = containerCfg.component;
                break;
            case 'rows':
                containerObj.rows = containerCfg.rows;
                break;
        }
    }
}