<template>
	<div>
		<FirstChild />
	</div>
</template>

<script>
import FirstChild from './FirstChild.vue';

export default{
  name: 'Parent',
  components: {
    FirstChild,
  },
};
</script>
