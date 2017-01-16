<template>
	<div>
		<FirstChild />
		<div>
			<div>
				<div />
				<div>
					<FirstChild />
				</div>
			</div>
		</div>
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
