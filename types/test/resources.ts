import Vue, { ComponentOptions, FunctionalComponentOptions } from "vue";

/**
 * Normal component options
 */
export interface INormal extends Vue {
    foo: string;
}
export const normalOptions: ComponentOptions<INormal> = {
    name: "normal",
    data() {
        return {
            foo: "bar",
        };
    },
};

/**
 * Functional component options
 */
export const functionalOptions: FunctionalComponentOptions = {
    functional: true,
    render(h) {
        return h("div");
    },
};

/**
 * Component constructor declared with vue-class-component etc.
 */
export class ClassComponent extends Vue {
    public bar = "bar";
}
