<template>
	<form id="form" class="form form-mock">
		<input id="input-text" class="input-text" type="text"/>
		<submit />
	</form>
</template>

<script>
import Submit from './Submit.vue';

export default {
  name: 'Form',
  components: {
    Submit,
  },
};
</script>