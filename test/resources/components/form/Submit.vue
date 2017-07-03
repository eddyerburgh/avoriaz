<template>
    <input id="input-submit" class="input-submit" type="submit" />
</template>

<script>
  export default{
    name: 'Submit',
    props: {
      hello: {
        default: 'world',
      },
    },
  };
</script>
