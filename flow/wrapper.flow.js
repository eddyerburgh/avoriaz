// @flow

declare type Selector = string | Component

declare interface WrapperInterface { // eslint-disable-line no-undef
    computed(): Object;
    contains(selector: Selector): boolean;
    data(): Object;
    destroy(): void;
    dispatch(event: string): void;
    hasAttribute(attribute: string, value: string): boolean;
    hasClass(className: string): boolean;
    hasStyle(style: string, value: string): boolean;
    find(selector: Selector): WrapperType;
    html(): string;
    instance(): Component;
    is(selector: Selector): boolean;
    isEmpty(): boolean;
    methods(): Object;
    name(): string;
    propsData(): Object,
    text(): string;
    setData(data: Object): void;
    setProps(data: Object): void;
    simulate(event: string): void;
    style(): Object;
    trigger(type: string): void;
    update(): void;
}

