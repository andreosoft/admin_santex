<template>
  <div
    class="f-table-col"
    :class="[sortable ? 'sortable' : '']"
    :style="{width: width + 'px'}"
    @click="$emit('sort', field)"
  >
    <slot></slot>
    <template v-if="sortable">
      <span v-if="sort.key != field">
        <i class="fas fa-sort"></i>
      </span>
      <span v-else class="arrow">
        <i class="fas" :class="sort.order == 'DESC' ? 'fa-sort-up' : 'fa-sort-down'"></i>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    sort: {
      type: Object,
      default: () => {}
    },
    sortable: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 100
    },
    field: {
      type: String,
      default: ""
    }
  }
};
</script>