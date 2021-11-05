<template>
  <v-img :src="getImage()"></v-img>
</template>

<script>
export default {
  props: {
    value: String,
    size: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    getImage() {
      if (this.value) {
        path =
          this.$root.api.image_download +
          "/" +
          this.value +
          "?width=" +
          this.size +
          "&height=" +
          this.size;
      } else {
        path = "/img/man.png";
      }
      return path;
    },
  },
};
</script>