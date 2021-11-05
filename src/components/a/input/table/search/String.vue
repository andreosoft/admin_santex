<template>
  <input
    class="f-search"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: [Number, String],
  },
};
</script>
<style lang="scss">
@import "styles.scss";
</style>