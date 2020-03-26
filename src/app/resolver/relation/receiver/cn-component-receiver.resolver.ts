import { ICnRelationResolver } from '../cn-relation.interface';

export class CnComponentReceiverResolver implements ICnRelationResolver {
    constructor(private _componentInstance: any) { }
    public resolve(cfg: any) {}
}
