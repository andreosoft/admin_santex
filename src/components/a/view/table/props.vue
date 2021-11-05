<template>
  <div>
    <div v-for="(el, i) in data" :key="i">{{ el.name }}: {{ el.value }}</div>
  </div>
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
  computed: {
    data() {
      let data = [];
      try {
        data = JSON.parse(this.value);
      } catch (error) {}
      return data;
    },
  },
};
</script>