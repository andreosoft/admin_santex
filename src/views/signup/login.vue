<template>
  <v-card style="width: 100%" max-width="500" class="pa-4">
    <v-form>
      <v-card-title class="title font-weight-regular justify-center">
        <span>Войти в систему</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-alert
            v-if="this.$store.getters['auth/status'] == 'error'"
            color="red darken-1"
            dark
          >
            {{ $t(this.$store.getters["auth/error"]) }}
          </v-alert>
          <a-form-model
            v-model="data"
            :model="model"
            :errors="errors"
            @validate="validate($event)"
          />
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn type="submit" color="primary" @click.prevent="submit()">
          {{ $t("Login") }}
        </v-btn>
        <!-- <v-btn color="primary" :to="{ name: 'registration' }">
          {{ $t("Registration") }}
        </v-btn> -->
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { validate, validators, fillForm } from "./../../components/mixings";

export default {
  mixins: [validate, validators, fillForm],
  data() {
    return {
      data: {},
      model: [
        {
          name: "login",
          title: "Email",
          validator: ["req"],
          type: "string",
        },
        {
          name: "password",
          title: "Пароль",
          type: "password",
          validator: ["req"],
        },
      ],
      errors: {},
    };
  },
  methods: {
    async submit() {
      if (await this.validateAll(this.data)) {
        await this.login();
      }
    },
    async login() {
      try {
        await this.$root.login({
          login: this.data.login,
          password: this.data.password,
        });
        this.$router.push("/");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
