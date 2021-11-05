<template>
  <a-form-input :value="color" :label="model.title">
    <template v-slot:default>
      <v-icon>mdi-palette</v-icon>
      <div class="d-inline-block">
        <a-input-base-color-picker v-model="color" />
      </div>
    </template>
  </a-form-input>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    model: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    color: {
      get: function () {
        if (!this.value) return "#FF0000FF";
        return this.value;
      },
      set: function (v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>