import validators from "./validators";

export default {
    mixins: [validators],
    methods: {
        validateAll: async function (data) {
            var noerror = true;
            for (var key in data) {
                if (await this.validate(key)) {
                    noerror = false;
                }
            }
            return noerror;
        },
        validate: async function (key) {
            return (this.errors[key] = await this.validator(
                this.validators[key],
                key,
                this.data
            ));
        }
    }
}