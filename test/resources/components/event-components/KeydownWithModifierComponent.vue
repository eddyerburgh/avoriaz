<template>
	<input type="text" @keydown.enter="keydownHandler" />
</template>

<script>
  export default{
    name: 'KeyDownWithModifierComponent',
    props: ['keydownHandler'],
  };
</script>
