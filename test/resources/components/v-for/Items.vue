<template>
  <div>
    <Item v-for="item in list" :item="item" />
  </div>
</template>

<script>
  import Item from './Item.vue';

  export default {
    name: 'Items',
    components: {
      Item,
    },
    props: ['list'],
  };
</script>
