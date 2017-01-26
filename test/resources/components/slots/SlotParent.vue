<template>
  <SlotChild>
    <h1 slot="header">Here might be a page title</h1>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
    <p slot="footer" class="slot-footer-content">Here's some contact info</p>
  </SlotChild>
</template>

<script>
import SlotChild from './SlotChild.vue';

export default {
  name: 'SlotParent',
  components: {
    SlotChild,
  },
};
</script>
