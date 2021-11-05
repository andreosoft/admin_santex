import genModelBase from './genModelBase'

export default {
    mixins: [genModelBase],
    computed: {
        viewName() {
            return this.$route.params.view;
        },
        getUrl() {
            return this.$root.api[this.$route.params.api] + "/" + this.viewName;
        },
        modelIndex() {
            return this.generateModel("index", this.viewName);
        },
        modelForm() {
            return this.generateModel("form", this.viewName);
        },
    }
}