<template>
  <div>
    <div v-if="!ready"  class="not-ready">not-ready</div>
    <div v-else class="ready">ready</div>
  </div>
</template>

<script>
  export default {
    name: 'If',
    data: () => ({
      ready: false,
    }),
  };
</script>
