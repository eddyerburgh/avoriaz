<template>
	<div @click="parentClickHandler">
		<button @click="childClickHandler" id="button" />
	</div>
</template>

<script>
  export default{
    name: 'Submit',
    props: ['parentClickHandler', 'childClickHandler'],
  };
</script>
