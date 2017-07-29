<template>
    <div>
        <form accept-charset="utf-8">
            <input id='query' v-model="searchQuery" name='query' type='search'>
            <input type='submit' value='Search'>
        </form>
    </div>
</template>

<script>
export default {
  name: 'search-form',
  data() {
    return {
      searchQuery: '',
    };
  },
};
</script>