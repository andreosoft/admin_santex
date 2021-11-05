<template>
  <div>
    <div>
      <div class="text-right pa-4">
        <v-btn class="ma-1" @click="addImage()">Добавить</v-btn>
      </div>
      <div>
        <v-row>
          <v-card
            v-for="(el, key) in items"
            :key="key"
            width="200px"
            class="ma-2"
          >
            <a :href="model.base_url + el" target="_blank"
              ><v-img
                :src="model.base_url + el + '?width=200&height=200'"
                height="200px"
              />
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="error"
                style="position: absolute; right: 8px; top: 8px"
                @click.prevent="remove(key)"
              >
                <v-icon dark> mdi-close </v-icon>
              </v-btn>
            </a>
          </v-card>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="dialogFile" hide-overlay persistent max-width="600">
      <v-card class="pt-8">
        <v-card-title>Загрузка изображений</v-card-title>
        <v-card-text>
          <v-file-input
            multiple
            outlined
            chips
            label="Выберите файл изображений"
            type="file"
            v-model="uploadsFiles"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="uploadsFiles ? false : true"
            :loading="fileLoading"
            color="primary"
            @click="upload()"
            >Загрузить</v-btn
          ><v-btn @click="dialogFile = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
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
      uploadsFiles: null,
      dialogFile: false,
      fileLoading: false,
    };
  },
  computed: {
    items: {
      get() {
        let d;
        try {
          d = JSON.parse(this.value);
        } catch (error) {
          d = [];
        }
        return d;
      },
      set(v) {
        this.$emit("input", JSON.stringify(v));
      },
    },
  },
  methods: {
    remove(key) {
      let e = this.items;
      e.splice(key, 1);
      this.items = e;
    },
    addImage() {
      this.uploadsFiles = null;
      this.dialogFile = true;
      this.fileLoading = false;
    },
    async upload() {
      this.fileLoading = true;
      let promises = [];
      for (let file of this.uploadsFiles) {
        promises.push(this.uploadFile(file));
      }
      await Promise.all(promises);
      this.fileLoading = false;
      this.dialogFile = false;
    },
    uploadFile(file) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        // file.uploadStatus = 0;
        this.$axios
          .post("/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // onUploadProgress: (progressEvent) => {
            //   file.uploadStatus = parseInt(
            //     (progressEvent.loaded / progressEvent.total) * 100
            //   );
            // },
          })
          .then((response) => {
            let data = response.data.data.file;
            let el = this.items;
            if (!Array.isArray(el)) el = [];
            el.push(data);
            this.items = el;
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            // this.$root.$emit("show-info", {
            //   text: "Error: " + error,
            // });
            reject(error);
          });
      });
    },
  },
};
</script>