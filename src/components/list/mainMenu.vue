<template>
  <v-list nav dense>
    <template v-for="(el, i) in value">
      <template v-if="el.auth <= role">
        <v-list-group
          v-if="el.sublist"
          :key="i"
          :value="false"
          :prepend-icon="el.icon"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ $t(el.name) }}</v-list-item-title>
          </template>

          <list-main-menu-item
            v-for="(e, i) in el.sublist"
            :key="i"
            :value="e"
          />
        </v-list-group>
        <list-main-menu-add-menu v-else-if="el.menu" :el="el" :key="i" />
        <list-main-menu-item v-else :key="i" :value="el" />
      </template>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    value: Array,
    role: {
      type: [Number, String],
      default: 0,
    },
  },
};
</script>