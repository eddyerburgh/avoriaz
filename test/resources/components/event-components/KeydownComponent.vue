<template>
	<input type="text" @keydown="keydownHandler" />
</template>

<script>
  export default{
    name: 'KeyDownComponent',
    props: ['keydownHandler'],
  };
</script>
