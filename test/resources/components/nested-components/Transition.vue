<template>
  <transition name="test-transition">
    <div class="parent"transition="test-transition">
      <div class="child" >
        <div class="child">
            <a><i /> </a>
        </div>

        <div class="child" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'transition-test',
};
</script>

