<template>
  <edit-dialog
    :value="value"
    @input="$emit('input')"
    :id="id"
    :model="model"
    :api="api"
  />
</template>

<script>
export default {
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      api: "/manager/users",
      model: this.$store.getters["config/get"].models.users.form,
    };
  },
};
</script>