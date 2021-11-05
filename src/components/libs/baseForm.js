import validate from "./validate";
import validators from "./validators";
import fillForm from "./fillForm";
import getForm from "./getForm";
import submitForm from "./submitForm";

export default {
    mixins: [validate, validators, fillForm, getForm, submitForm],
    props: {
        show: Boolean,
        api: String,
        model: Array,
        value: Object  
    },
    watch: {
        show(val) {
            if (val) this.updateData()
        },
    },
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        afterSave(data, status) {
            if (status) {
                this.$emit("update-data", this.data);
                this.$emit("input", this.data);
                this.closeForm();
            }
        },
    },
};