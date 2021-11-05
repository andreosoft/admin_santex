export default {
    methods: {
        async remove(api, id) {
            this.loading = true;
            const response = await this.$axios({
                method: "delete",
                url: api + "/" + id,
                data: {},
                params: {}
            })
            this.loading = false;
            this.afterRemove(response);
        },
        afterRemove(data) { }
    }
}