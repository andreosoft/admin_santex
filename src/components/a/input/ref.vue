<template>
  <v-autocomplete
    outlined
    :disabled="disabled"
    :items="data"
    :value="values[model.name + '_id']"
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
      return this.$root.api[this.model.model.api] + "/select";
      // let api;
      // if (this.model.api) api = this.model.api;
      // else api = "basic";
      // return this.$root.api[api];
    },
  },
  methods: {
    onInput(e) {
      let res = {};
      res[this.model.name] = this.data.find((x) => x.value == e).text;
      res[this.model.name + "_id"] = e;
      this.$emit("input", res);
    },
    async fetchData() {
      this.loading = true;
      let response = await this.$axios.g(this.api);
      this.loading = false;
      this.data = response.data.data;
    },
  },
};
</script>