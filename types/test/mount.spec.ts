import Vuex from 'vuex'
import Vue from 'vue'
import { mount } from '../'
import { functionalOptions, ClassComponent } from './resources'

/**
 * Test for mount options
 */
const localVue = Vue
localVue.use(Vuex)

const store = new Vuex.Store({})

mount<ClassComponent>(ClassComponent, {
    attachToDocument: true,
    instance: localVue,
    globals: {
        $store: store
    },
    slots: {
        default: ClassComponent,
        foo: [ClassComponent],
    },
})

mount(functionalOptions, {
    context: {
        props: { foo: 'test' }
    },
    children: ['child', ClassComponent],
})

/**
 * MountOptions should receive Vue's component options
 */
mount<ClassComponent>(ClassComponent, {
    propsData: {
        test: 'test'
    }
})