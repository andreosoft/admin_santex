<template>
  <a-view-base-type-1 :value="value" :label="model.title">
    <a-view-table-phones :value="value" :model="model" />
  </a-view-base-type-1>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    model: Object,
  },
};
</script>