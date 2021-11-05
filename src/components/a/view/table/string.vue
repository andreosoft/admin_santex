<template>
  <div v-html="value"></div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    model: {
      type: Object,
      default: {},
    },
  },
};
</script>