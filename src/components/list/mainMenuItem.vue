<template>
  <v-list-item link :to="value.route">
    <v-list-item-icon>
      <v-icon>{{ value.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{ $t(value.name) }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    value: Object,
  },
};
</script>
