<template>
    <a-view-base-type-1 :value="value" :label="model.title" />
</template>

<script>
export default {
  props: {
    value: [String, Number],
    model: Object
  },
};
</script>