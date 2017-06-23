<template>
    <button @click="clickHandler">Go</button>
</template>

<script>
    export default {
      methods: {
        clickHandler() {
          console.log('Clicked'); // eslint-disable-line no-console
        },
      },
    };
</script>