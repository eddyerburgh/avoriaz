import Vue, { Component, ComponentOptions, FunctionalComponentOptions, VNode } from "vue";

/**
 * Utility type to declare an extended Vue constructor
 */
type VueClass<V extends Vue> = (new (...args: any[]) => V) & typeof Vue;

/**
 * Utility type for a selector
 */
type Selector = string | Component;

/**
 * Utility type for slots
 */
interface Slots {
    [key: string]: Component[] | Component | Wrapper | Wrapper[];
}

/**
 * Utility type for stubs which can be a string of template as a shorthand
 * If it is an array of string, the specified children are replaced by blank components
 */

type Children =  Array<Component | string>;

/**
 * Base class of Wrapper and WrapperArray
 * It has common methods on both Wrapper and WrapperArray
 */
interface Wrapper {
    attachedToDocument: boolean;
    vm: Vue;
    vNode: VNode;
    mountedToDom: boolean;
    isVueInstance: boolean;
    element: HTMLElement;
    computed(): object;
    contains(selector: Selector): boolean;
    data(): object;
    destroy(): void;
    getAttribute(attribute: string): string;
    getProp(propName: string): any;
    hasAttribute(attribute: string, value?: string): boolean;
    hasClass(className: string): boolean;
    hasStyle(style: string, value: string): boolean;
    find(selector: Selector): Wrapper[];
    html(): string;
    is(selector: Selector): boolean;
    isEmpty(): boolean;
    methods(): object;
    name(): string;
    propsData(): object;
    text(): string;
    update(): void;
    setData(data: object): void;
    setProps(props: object): void;
    setMethods(methods: object): void;
    trigger(eventName: string): void;
    update(): void;
    value(): string | boolean;
}

interface MountOptions<V extends Vue> extends ComponentOptions<V> {
    attachToDocument?: boolean;
    context?: object;
    children?: Children;
    slots?: Slots;
    globals?: object;
    instance?: typeof Vue;
    renderDefaultSlot?: boolean;
}


export declare function shallow<V extends Vue, Ctor extends VueClass<V> = VueClass<V>>(component: Ctor, options?: MountOptions<Vue>): Wrapper;
export declare function mount<V extends Vue, Ctor extends VueClass<V> = VueClass<V>>(component: Ctor, options?: MountOptions<Vue>): Wrapper;
export declare function mount<V extends Vue>(component: ComponentOptions<V>, options?: MountOptions<Vue>): Wrapper;
export declare function mount(component: FunctionalComponentOptions, options?: MountOptions<Vue>): Wrapper;
