<template>
  <div>{{val}}</div>
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
  computed: {
    val() {
      if (this.value) {
        return this.value.toLocaleString("ru-Ru");
      }
      return this.value
    }
  }
};
</script>