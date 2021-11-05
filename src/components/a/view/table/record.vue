<template>
  <div v-html="player(value)"></div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    model: {
      type: Object,
      default: {},
    },
  },
  methods: {
    player: function(url) {
      return (
        '<audio class="audio-player calls-audio" controls>' +
        '<source src="' +
        this.$root.recordUrl +
        url +
        '"' +
        ' type="audio/mpeg"/></audio>'
      );
    },
  }
};
</script>