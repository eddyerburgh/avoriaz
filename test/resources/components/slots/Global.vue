<template>
    <div>
        <div id="container">
            <global-component>HELLO</global-component>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    Vue.component('global-component', { render: h => h('div', this.$slots.default) });

    export default {
      name: 'global-slots',
    };
</script>