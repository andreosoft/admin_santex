<template>
  <a-view-base-type-1 :value="true" :label="model.title">
    <a-view-base-select :value="value" :model="model" />
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