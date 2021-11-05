<template>
  <v-menu
    v-model="menu"
    offset-x
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mb-1"
        width="100%"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ $t(el.name) }}
      </v-btn>
    </template>
    <component v-if="el.menu.component" :is="el.menu.component" @close="menu = false"/>
  </v-menu>
</template>

<script>
export default {
    props: {
        el: Object
    },
    data() {
        return {
            menu: false
        }
    }
}
</script>