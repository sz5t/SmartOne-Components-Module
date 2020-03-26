import { ComponentProviderService } from './../../services/component/component-provider.service';
import { IResolver } from '../base/cn-resolver.interface';
import { COMPONENT_TYPES } from './cn-component.type';


export class CnComponentResolver implements IResolver {

    constructor(private componentService: ComponentProviderService) {
    }

    public resolve(config) {
        let componentObj;
        if (config) {
            if (config.component && COMPONENT_TYPES[config.component]) {
                // 此处应有对应的组件解析,后续处理
                componentObj = config;
            } else {
                const cmptObj: any = this._getComponentObjectById(config.id);
                cmptObj['component'] = config.container;
                if (!COMPONENT_TYPES[cmptObj.component]) {
                    const supportedTypes = Object.keys(COMPONENT_TYPES).join(', ');
                    throw new Error(
                        `Trying to use an unsupported types (${
                        config.component
                        }).Supported types: ${supportedTypes}`
                    );
                } else {
                    componentObj = config;
                }
            }
        }
        return componentObj;
    }

    private _getComponentObjectById(id) {
        return this.componentService.cacheService.getNone(id);
    }
}