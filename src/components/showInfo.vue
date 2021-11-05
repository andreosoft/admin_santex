<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="color" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      snackbar: false,
      text: null,
      timer: null,
      color: null
    };
  },
  created() {
    this.$root.$on("show-info", (data) => {
      let time = 2000;
      if (data.time) {
        time = data.time;
      }
      this.snackbar = true;
      this.text = data.text;
      this.color = data.color ? data.color : "red";
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.text = "";
        this.snackbar = false;
      }, time);
    });
  },
};
</script>