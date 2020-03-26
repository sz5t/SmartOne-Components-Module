export interface ICnTriggerResolver {
    resolve(cfg: any);
}

export const CN_TRIGGER_TYPE = {
    STATE: 'STATE',
    BEHAVIOR: 'BEHAVIOR',
    ACTION: 'ACTION',
    OPERATION: 'OPERATION',
    LINK: 'LINK'
}