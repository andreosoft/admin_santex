<template>
  <a-input-base-date-picker-range
    :value="value"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <div class="f-search">{{ value }}</div>
  </a-input-base-date-picker-range>
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