<template>
  <v-navigation-drawer
    color="#313644"
    v-model="$root.leftMenuDrawer"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    dark
    app
    width="260"
    v-bind="$attrs"
  >
    <v-divider class="mb-1" />
    <v-list>
      <v-list-item
        two-line
        class="px-2"
        link
        @click.prevent="$root.dialogShow = true"
      >
        <v-list-item-avatar>
          <v-img :src="getImage()"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $root.profile.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $root.profile.login }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <list-main-menu :value="mainMenu" :role="$root.profile.role" />
    <template v-slot:append>
      <v-list-item link @click="$root.logout">
        <v-list-item-icon>
          <i class="fas fa-sign-out-alt"></i>
        </v-list-item-icon>
        <v-list-item-title>Выйти</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      mainMenu: this.$root.config.mainMenu,
    };
  },
  created() {
    console.log(this.$root.config);
  },
  methods: {
    getImage() {
      let im = this.$store.getters["auth/profile"].image;
      let path;

      if (im) {
        path =
          this.$root.config.baseUrl +
          "/image/download/" +
          im +
          "?width=50&height=50";
      } else {
        path = "/img/man.png";
      }
      return path;
    },
  },
};
</script>