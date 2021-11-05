export default {
    data() {
        return {
            data: {},
            errors: {},
            validators: {}
        }
    },
    created() {
        this.fillForm();
    },
    methods: {
        resetFrom() {
            this.data = {},
            this.errors = {},
            this.validators = {}
        },
        getDefaultValue(el) {
            if (this.defaults && this.defaults[el.name] !== undefined) return this.defaults[el.name];
            if (el.default !== undefined) return el.default;
            return null
        },
        fillForm() {
            this.fillFormFromModel(this.model);
        },
        fillFormFromModel(model) {
            for (let el of model) {
                if (!this.data[el.name]) {
                    this.$set(this.data, el.name, this.getDefaultValue(el));
                    this.$set(this.errors, el.name, null);
                    if (el.type == "ref") {
                        this.$set(this.data, el.name + "_id", this.getDefaultValue(el.name));
                        this.$set(this.errors, el.name + "_id", null);
                    }
                }
                if (el.validator) {
                    let name = el.name;
                    if (el.type == "ref") {
                        name = name + "_id";
                    }
                    this.$set(this.validators, name, el.validator);
                }
            }
        },
        arrayModelFromModel(model) {
            let ret = [];
            for (let el in model) {
                let m = model[el];
                m.name = el
                ret.push(m)
            }
            return ret;
        },
    }
}