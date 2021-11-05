<template>
  <span v-html="getTextByValue(value, model)"></span>
</template>

<script>
import { modelOptions } from "../../../mixings";

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