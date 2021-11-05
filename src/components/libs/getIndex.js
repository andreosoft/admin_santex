export default {
    data() {
        return {
            loading: false,
            data: [],
            sort: {
                key: "id",
                order: "DESC",
            },
            pager: {
                page: 0,
                count: 0,
                limit: 50,
            },
            filters: {},
        };
    },
    methods: {
        async updateData() {
            await this.fetchData();
        },
        async fetchData(append = false) {
            this.loading = true;
            let response = await this.$axios.get(this.api, {
                params: { sort: this.sort, filters: this.filters, pager: this.pager },
            });
            this.loading = false;
            this.pager = response.data.pager;
            if (append) {
                this.data = this.data.concat(response.data.data);
            } else {
                this.data = response.data.data;
            }
            this.$emit('dataUpdated', response.data);
            await this.afterFetchData(response);
        },
        async afterFetchData(response) {

        }
    },
};