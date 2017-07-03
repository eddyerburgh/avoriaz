<template>
    <div>
        <submit hello="hello"></submit>
    </div>
</template>

<script>
    import Submit from '../form/Submit.vue';

    export default {
      name: 'child-props',
      components: {
        Submit,
      },
      data: {
        hello: 'hello',
      },
    };
</script>