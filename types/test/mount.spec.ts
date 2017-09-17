import Vue from "vue";
import Vuex from "vuex";
import { mount } from "../";
import { ClassComponent, functionalOptions } from "./resources";

/**
 * Test for mount options
 */
const localVue = Vue;
localVue.use(Vuex);

const store = new Vuex.Store({});

const slotWrapper = mount(ClassComponent, {
    propsData: {
        prop1: "asd",
    },
});

mount<ClassComponent>(ClassComponent, {
    attachToDocument: true,
    globals: {
        $store: store,
    },
    instance: localVue,
    renderDefaultSlot: true,
    slots: {
        bar: slotWrapper,
        default: ClassComponent,
        foo: [ClassComponent],
    },
});

mount(functionalOptions, {
    children: ["child", ClassComponent],
    context: {
        props: { foo: "test" },
    },
});

/**
 * MountOptions should receive Vue's component options
 */
mount<ClassComponent>(ClassComponent, {
    propsData: {
        test: "test",
    },
});

const wrapper = mount(ClassComponent);

wrapper.contains("hello");
wrapper.destroy();
wrapper.hasAttribute("attr");
wrapper.hasAttribute("attr", "value");
wrapper.hasClass("className");
wrapper.hasStyle("color", "red");
wrapper.find("div");
wrapper.find(ClassComponent);
wrapper.find("div")[0].is("div");
wrapper.find(ClassComponent);
wrapper.getAttribute("attribute");
wrapper.getProp("prop");
wrapper.html();
wrapper.is("div");
wrapper.isEmpty();
wrapper.methods();
wrapper.name();
wrapper.propsData();
wrapper.text();
wrapper.value();
wrapper.data();
wrapper.computed();
wrapper.update();
wrapper.setData({data: true});
wrapper.setProps({props: true});
wrapper.setMethods({methods: true});
wrapper.trigger("click");
