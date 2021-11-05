<template>
  <select
    class="f-search"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  >
    <option value="">{{ $t('All') }}</option>
    <option v-for="(el, i) in data" :key="i" :value="el.value">
      {{ el.text }}
    </option>
  </select>
</template>

<script>
import modelOptions from "../../../../libs/modelOptions";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    model: Object,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.fitchData();
  },
  watch: {
    // model() {
    //   this.fitchData();
    // }
  },
  computed: {
    api() {
      return this.$root.api[this.model.model.api] + "/select";
    }
  },
  methods: {
    async fitchData() {
      let response = await this.$axios.g(this.api);
      this.data = response.data.data;
    }
  }
};
</script>
<style lang="scss">
@import "styles.scss";
</style>