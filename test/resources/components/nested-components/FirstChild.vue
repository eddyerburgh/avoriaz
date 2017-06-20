<template>
	<div>
		<SecondChild />
		<SecondChild />
		<div>
			<SecondChild />
		</div>
	</div>
</template>

<script>
import SecondChild from './SecondChild.vue';

export default{
  name: 'FirstChild',
  components: {
    SecondChild,
  },
  beforeCreate() {
    console.log('beforeCreate'); // eslint-disable-line no-console
  },
  created() {
    console.log('created'); // eslint-disable-line no-console
  },
  beforeMount() {
    console.log('beforeMount'); // eslint-disable-line no-console
  },
  mounted() {
    console.log('mounted'); // eslint-disable-line no-console
  },
  beforeUpdate() {
    console.log('beforeUpdate'); // eslint-disable-line no-console
  },
  updated() {
    console.log('updated'); // eslint-disable-line no-console
  },
  beforeDestroy() {
    console.log('beforeDestroy'); // eslint-disable-line no-console
  },
  destroyed() {
    console.log('destroyed'); // eslint-disable-line no-console
  },
  activated() {
    console.log('beforeDestroy'); // eslint-disable-line no-console
  },
  deactivated() {
    console.log('destroyed'); // eslint-disable-line no-console
  },
};
</script>
