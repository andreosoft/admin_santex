<template>
  <a-table-v-base
    :model="model"
    :data="data"
    :loading="loading"
    :sort="sort"
    :pager="pager"
    @click="$emit('click', $event)"
    @change-options="updateOptions($event)"
  >
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:item.actions="{ item }">
      <slot name="item.actions" v-bind:item="item" />
    </template>
    <template no-data>
      <slot name="no-data" />
    </template>
  </a-table-v-base>
</template>

<script>
import { getIndex } from "../../../mixings";

export default {
  mixins: [getIndex],
  props: {
    api: String,
    model: [Object, Array],
    reload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    reload() {
      this.updateData();
    },
    api() {
      this.updateData();
    },
  },
  methods: {
    updateOptions(v) {
      if (v.sortBy[0]) this.sort.key = v.sortBy[0];
      this.sort.order = v.sortDesc[0] ? "ASC" : "DESC";
      this.pager.page = v.page - 1;
      this.pager.limit = v.itemsPerPage;
      this.updateData();
    },
  },
};
</script>