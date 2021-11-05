<template>
  <v-app-bar
    color="secondary"
    id="app-bar"
    fixed
    app
    flat
    height="60"
    style="overflow-x: auto; color: #fff"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="$root.leftMenuDrawer = !$root.leftMenuDrawer"
    >
      <v-icon v-if="$root.leftMenuDrawer"> mdi-view-quilt </v-icon>
      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-toolbar-title
      class="d-none d-sm-flex font-weight-light"
      v-text="$root.title ? $t($root.title) : $root.config.appName"
    />

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>