<template>
  <v-select
    outlined
    :items="getOptions(model)"
    item-text="text"
    item-value="value"
    :value="value"
    :label="$t(model.title)"
    :error-messages="error"
    :disabled="disabled"
    @input="$emit('input', $event)"
  ></v-select>
</template>

<script>
import modelOptions from "./../../libs/modelOptions";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    model: Object,
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>