<template>
  <edit-dialog
    :value="value"
    @input="$emit('input')"
    :id="id"
    :model="model"
    :api="api"
    :defaults="defaults"
  />
</template>

<script>
export default {
  props: {
    value: Boolean,
    id: Number,
    defaults: Object
  },
  data() {
    return {
      api: "/manager/categories",
      model: this.$store.getters["config/get"].models.categories.form,
    };
  },
};
</script>