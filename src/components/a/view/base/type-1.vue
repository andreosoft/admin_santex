<template>
  <a-form-input :value="value" :label="label">
    <slot>
      {{ value }}
    </slot>
  </a-form-input>
</template>

<script>
export default {
  props: {
    value: [String, Number, Boolean],
    label: String,
  },
};
</script>