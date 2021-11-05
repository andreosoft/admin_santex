<template>
  <div>
    <v-file-input
      outlined
      chips
      :color="color"
      :label="model.title"
      :error-messages="error"
      :disabled="disabled"
      type="file"
      @change="onChange"
    ></v-file-input>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Пожалуста подождите
          <v-progress-linear
            :value="status"
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: [String],
    model: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      status: 0,
      color: null,
    };
  },

  methods: {
    onChange(file) {
      if (file) this.uploadFile(file);
      else this.$emit("input", null);
    },
    uploadFile(file) {
      this.loading = true;
      this.status = 0;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      this.$axios
        .post("/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            this.status = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
        })
        .then((response) => {
          this.loading = false;
          let data = response.data.data.file;
          this.$emit("input", data);
        })
        .catch(function (error) {
          this.$root.$emit("show-info", {
            text: "Error: " + error,
          });
        });
    },
  },
};
</script>