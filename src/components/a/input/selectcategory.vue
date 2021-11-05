<template>
  <v-autocomplete
    outlined
    :disabled="disabled"
    :items="data"
    :value="value"
    :label="model.title"
    :error-messages="error"
    item-text="text"
    item-value="value"
    @input="onInput($event)"
  ></v-autocomplete>
</template>

<script>
export default {
  // mixins: [modelOptions],
  props: {
    value: [String, Number, Object],
    values: Object,
    model: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    api() {
      return "/manager/categories/select";
    },
  },
  methods: {
    onInput(e) {
      let res = {};
      // res[this.model.name] = this.data.find((x) => x.value == e).text;
      res[this.model.name] = e;
      this.$emit("input", res);
    },
    async fetchData() {
      this.loading = true;
      let response = await this.$axios.get(this.api);
      this.loading = false;
      this.data = response.data.data;
    },
  },
};
</script>