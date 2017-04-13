<template>
  <div class="color-red">
    <p>
      <span />
    </p>
  </div>
</template>

<script>
export default {
  name: 'DivColorRed',
};
</script>

<style>
.color-red {
  color: red;
}

.color-red > p {
  color: red;
}

p span {
  color: red;
}
div > span {
  color: orange
}
</style>
