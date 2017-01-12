<template>
	<div @click="parentClickHandler">
		<button @click="childClickHandler" id="button" />
	</div>
</template>

<script>
  export default{
    name: 'ClickComponent',
    props: ['parentClickHandler', 'childClickHandler'],
  };
</script>
