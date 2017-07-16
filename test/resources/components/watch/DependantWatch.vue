<template>
    <div />
</template>

<script>
    export default {
      props: ['value', 'show'],
      watch: {
        show(isShow) {
          if (isShow) {
            console.warn(`show watch : ${this.show},${this.value}`);
          }
        },
      },
    };
</script>