<template>
  <div>
    {{ el[field.name] }}
  </div>
</template>

<script>
// import viewImage from "../bviews/viewImage.vue";

export default {
  name: "table2View",
  //   components: { viewImage },
  props: {
    el: Object,
    field: Object,
  },
  data() {
    return {
      api: this.$root.api,
    };
  },
  computed: {
    render() {
      if (this.field.data && this.field.data.render) {
        return this.field.data.render(this.el);
      }
      return this.el[this.field.name];
    },
  },
  methods: {
    onClick(e) {
      if (e == "update") {
        let name = this.$route.name;
        this.$router.push({ name: name + "_view", params: { id: this.el.id } });
      } else if (e.name == "update_modal") {
        e.data.id = this.el.id;
        e.data.visible = true;
      } else if (e.name == "route") {
        this.$router.push({ name: e.data.name, params: { id: this.el.id } });
      }
    },
    routerTo: function (to) {
      this.$router.push(to);
    },
  },
};
</script>