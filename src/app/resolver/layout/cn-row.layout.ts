import { CnLayoutBase } from './cn-layout.base';
import { CnLayoutColumns } from './cn-columns.layout';
import { ICnLayout } from './cn-layout.interface';

export class CnLayoutRow implements ICnLayout{

    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    private _cols: CnLayoutColumns[];
    public get cols(): CnLayoutColumns[] {
        return this._cols ? this._cols : [];
    }
    public set cols(value: CnLayoutColumns[]) {
        this._cols = value;
    }

    constructor(_id:string, _type: string, _title: string) {
        this.id = _id;
        this.type = _type;
        this.title = _title;
    }

    public  addChild(col: any) {
        this.cols.push(col);
    }

    public deleteChild(col: any) {

    }

    public edit(col: any) {

    }
    
}