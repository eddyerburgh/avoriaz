// @flow

declare type MountOptions = { // eslint-disable-line no-undef
    attachToDocument?: boolean,
    context?: boolean,
    children?: Array<string | Component>,
    slots?: Array<Component> | Component,
    globals?: Object,
    instance?: Component
}
