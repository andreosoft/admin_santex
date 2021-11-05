<template>
  <v-text-field
    outlined
    :value="value"
    :label="model.title"
    :error-messages="error"
    :type="hidden ? 'password' : 'text'"
    :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
    :disabled="disabled"
    @input="$emit('input', $event)"
    @click:append="hidden = !hidden"
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
  data() {
    return {
      hidden: true,
    };
  },
};
</script>