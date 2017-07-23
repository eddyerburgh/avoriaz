// @flow

declare type Slots = {
    [key: string]: Component | string | Array<Component | string>,
}

declare type MountOptions = { // eslint-disable-line no-undef
    attachToDocument?: boolean,
    context?: boolean,
    children?: Array<string | Component>,
    slots?: Slots,
    globals?: Object,
    instance?: Component
}
