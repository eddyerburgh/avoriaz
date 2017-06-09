<template>
  <table>
    <tbody>
    <Row></Row>
    </tbody>
  </table>
</template>

<script>
  import Row from './Row.vue';

  export default{
    name: 'Table',
    components: {
      Row,
    },
  };
</script>
