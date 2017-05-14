<template>
  <div>
    <unnamed-child />
    <unnamed-child />
    <unnamed-child />
  </div>
</template>

<script>
  import UnnamedChild from './UnnamedChild.vue';

  export default {
    components: {
      UnnamedChild,
    },
  };
</script>
