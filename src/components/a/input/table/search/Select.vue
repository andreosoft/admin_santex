<template>
  <select
    class="f-search"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  >
    <option value="">{{ $t('All') }}</option>
    <option v-for="(el, i) in getOptions(model)" :key="i" :value="el.value">
      {{ el.text }}
    </option>
  </select>
</template>

<script>
import modelOptions from "./../../../../libs/modelOptions";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    model: Object,
  },
};
</script>
<style lang="scss">
@import "styles.scss";
</style>