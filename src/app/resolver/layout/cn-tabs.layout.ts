import { CnLayoutBase } from './cn-layout.base';
import { ICnLayout } from './cn-layout.interface';

export class CnLayoutTabs extends CnLayoutBase implements ICnLayout {
    private _tabContent: LayoutTab[];
    public get tabContent(): LayoutTab[] {
        return this._tabContent;
    }
    public set tabContent(value: LayoutTab[]) {
        this._tabContent = value;
    }
    private _tabActiveMapping;
    public get tabActiveMapping() {
        return this._tabActiveMapping;
    }
    public set tabActiveMapping(value) {
        this._tabActiveMapping = value;
    }

    addChild (tab: LayoutTab) {
        this._tabContent.push(tab);
    }
    deleteChild (child: LayoutTab) {
        throw new Error("Method not implemented.");
    }
    edit(child: LayoutTab) {
        throw new Error("Method not implemented.");
    }
}

export class LayoutTab extends CnLayoutBase {
    private _active: boolean;
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }
}