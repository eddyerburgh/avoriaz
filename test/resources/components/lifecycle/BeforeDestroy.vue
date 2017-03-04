<template>
  <div />
</template>

<script>

export default{
  name: 'BeforeDestroy',
  beforeDestroy() {
    this.func();
  },
  props: ['func'],

};
</script>
