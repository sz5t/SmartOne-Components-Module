import { ICnDataState } from './cn-data-state.interface';
import { CnComponentBase } from './cn-component-base';

export class CnTableBase extends CnComponentBase {
    private _dataList: any[];
    public get dataList(): any[] {
        return this._dataList;
    }
    public set dataList(value: any[]) {
        this._dataList = value;
    }

    private _tableColumns: any[];
    public get tableColumns(): any[] {
        return this._tableColumns ? this._tableColumns : [];
    }
    public set tableColumns(value: any[]) {
        this._tableColumns = value;
    }

    public isLoading = false;

    private _spanCount: number;
    public get spanCount(): number {
        return this._spanCount ? this._spanCount : 0;
    }
    public set spanCount(value: number) {
        this._spanCount = value;
    }

    private _pageIndex: number;
    public get pageIndex(): number {
        return this._pageIndex ? this._pageIndex : 1;
    }
    public set pageIndex(value: number) {
        this._pageIndex = value;
    }

    private _pageSize: number;
    public get pageSize(): number {
        return this._pageSize ? this._pageSize : 10;
    }
    public set pageSize(value: number) {
        this._pageSize = value;
    }

    private _total: number;
    public get total(): number {
        return this._total ? this._total : 0;
    }
    public set total(value: number) {
        this._total = value;
    }

    private _isAllChecked: boolean;
    public get isAllChecked(): boolean {
        return this._isAllChecked;
    }
    public set isAllChecked(value: boolean) {
        this._isAllChecked = value;
    }

    private _indeterminate: boolean;
    public get indeterminate(): boolean {
        return this._indeterminate;
    }
    public set indeterminate(value: boolean) {
        this._indeterminate = value;
    }

    private _mapOfDataState: ICnDataState;
    public get mapOfDataState(): ICnDataState {
        return this._mapOfDataState;
    }
    public set mapOfDataState(value: ICnDataState) {
        this._mapOfDataState = value;
    }

    private _checkedNumber: number;
    public get checkedNumber(): number {
        return this._checkedNumber ? this._checkedNumber : 0;
    }
    public set checkedNumber(value: number) {
        this._checkedNumber = value;
    }

    private _sortName: string;
    public get sortName(): string {
        return this._sortName;
    }
    public set sortName(value: string) {
        this._sortName = value;
    }

    private _sortValue: string;
    public get sortValue(): string {
        return this._sortValue;
    }
    public set sortValue(value: string) {
        this._sortValue = value;
    }

    private _selectedRowValue: any;
    public get selectedRowValue(): any {
        return this._selectedRowValue;
    }
    public set selectedRowValue(value: any) {
        this._selectedRowValue = value;
    }

    protected buildPaging(config) {
        const params: any = {};
        if (config.isPagination) {
            params._page = this.pageIndex;
            params._rows = this.pageSize;
        }
        return params;
    }

    protected buildSort() {
        const sortObj: any = {};
        if (this._sortName && this._sortValue) {
            sortObj._sort = this._sortName + this._sortValue;
        }
        return sortObj;
    }
}
