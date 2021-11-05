export default {
    methods: {
        getOptions(model) {
            if (model && model.options) {
                if (Array.isArray(model.options)) return model.options;
                return this.$root.config.meta.enum[model.options];
            }
        },
        getElementByValue(value, model) {
            let options = this.getOptions(model);
            if (options) {
            return options.find((x) => x.value == value)
                ? options.find((x) => x.value == value)
                : {};
            }
        },
        getTextByValue(value, model) {
            let text = this.getElementByValue(value, model)
            return text.text ? text.text : this.$t('none')
        }
    },
}