<template>
  <div v-html="getTextByValue(value, dataModel)"></div>
</template>

<script>
import { modelOptions } from "./../../../mixings";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    values: [Object],
    model: {
      type: Object,
      default: {},
    },
  },
  computed: {
    dataModel() {
      return {
        options: this.$root.config.meta.enum[this.model.options][this.values.status],
      }
    }
  }
};
</script>