export default {
    methods: {
        generateModel(type, viewName) {
            let r = [];
            let view = this.getConfigView(viewName);
            if (!view.model) return console.log('not find', viewName);
            let dataModel = this.getConfigModel(view.model);
            let dataView = view[type].data;
            for (let i = 0; i < dataView.length; i++) {
                let el = dataView[i];
                let a = { ...el, ...dataModel[el.name] };
                r.push(a);
            }
            return r;
        },
        getConfigModel(name) {
            return this.$root.config.meta.models[name].data;
            
        },
        getConfigView(name) {
            return this.$root.config.meta.views[name];
        },
    }
}