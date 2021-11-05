<template>
  <div v-html="getTextByValue(value, model)"></div>
</template>

<script>
import { modelOptions } from "./../../../mixings";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    model: {
      type: Object,
      default: {},
    },
  },
};
</script>