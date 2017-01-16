<template>
	<div />
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      foo: 'foo',
    };
  },
  computed: {
    addBar() {
      return `${this.foo}bar`;
    },
  },
};
</script>