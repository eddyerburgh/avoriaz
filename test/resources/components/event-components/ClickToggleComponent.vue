<template>
	<div id="child"
		@click="toggleActive"
		v-bind:class="{ active: isActive }"
	/>
</template>
<script>
export default {
  name: 'app',
  props: ['clickHandler'],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>