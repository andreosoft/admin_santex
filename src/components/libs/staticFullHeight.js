export default {
  data() {
    return {
      contentHeight: 0,
      contentHeightHeader: 152
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize, true);
    this.onResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize, true);
  },
  methods: {
    onResize() {
      let height = window.innerHeight;
      this.contentHeight = height - this.contentHeightHeader;
    }
  },
};