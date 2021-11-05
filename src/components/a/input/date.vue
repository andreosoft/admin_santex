<template>
  <a-form-input :value="date" :label="model.title">
    <template v-slot:default>
      <v-icon>mdi-calendar</v-icon>
      <div class="d-inline-block">
        <a-input-base-date-picker v-model="date" />
      </div>
    </template>
  </a-form-input>
</template>

<script>
export default {
  props: {
    value: [String],
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
    date: {
      get: function () {
        if (!this.value) return (new Date()).date
        return this.value;
      },
      set: function (v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>