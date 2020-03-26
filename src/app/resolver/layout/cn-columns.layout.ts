import { ICnLayout } from './cn-layout.interface';
import { CnLayoutBase } from './cn-layout.base';

export class CnLayoutColumns extends CnLayoutBase implements ICnLayout {
    private _cols: CnLayoutBase[];
    public get cols(): CnLayoutBase[] {
        return this._cols;
    }
    public set cols(value: CnLayoutBase[]) {
        this._cols = value;
    }

    addChild(col: CnLayoutBase) {
        this.cols.push(col);
    }

    deleteChild(child: any) {
        throw new Error("Method not implemented.");
    }

    edit(child: any) {
        throw new Error("Method not implemented.");
    }

    
}