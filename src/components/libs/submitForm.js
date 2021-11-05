import validate from "./validate";

export default {
    mixins: [validate],
    created() {
        window.addEventListener("keydown", this.pressButtonEvent);
    },
    destroyed() {
        window.removeEventListener("keydown", this.pressButtonEvent);
    },
    methods: {
        pressButtonEvent(e) {
            if (e.keyCode == 83 && event.ctrlKey) {
                e.preventDefault();
                this.submit();
                return false;
            }
        },
        async submit() {
            if (await this.validateAll(this.data)) {
                await this.post(this.data, this.api);
                return true;
            }
            return false;
        },
        async post(data, api) {
            this.loading = true;
            let response = await this.$axios.post(api, data);
            this.loading = false;
            let status = response.data.status == "ok";
            if (response.data.data) {
                Object.assign(this.data, response.data.data);
                this.$root.$emit("show-info", {
                    text: "Данные записаны",
                  });
            }
            this.afterSave(this.data, status);
        },
        afterSave(data, status) { },
    }
}