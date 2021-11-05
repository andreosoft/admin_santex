<template>
  <v-text-field
    :value="value"
    :label="model.title"
    :error-messages="error"
    :disabled="disabled"
    @input="$emit('input', $event)"
  ></v-text-field>
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
};
</script>