<template>
	<form id="form-mock">
		<input class="input-text" type="text"/>
		<submit />
	</form>
</template>

<script>
import Submit from './Submit.mock.vue';

export default {
  name: 'Form',
  components: {
    Submit,
  },
};
</script>

