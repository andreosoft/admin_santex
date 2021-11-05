<template>
  <div>
    <div v-for="(item, i) in items" :key="i">
      {{ item.phone }}
    </div>
  </div>
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
    items() {
      let res;
      try {
        res = JSON.parse(this.value);
      } catch (error) {
        res = this.value;
      }
      if (!Array.isArray(res)) {
        res = [
          {
            phone: this.value,
            type: 1,
          },
        ];
      }
      return res;
    },
  },
};
</script>