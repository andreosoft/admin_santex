<template>
  <v-card style="width: 100%" max-width="500" class="pa-4">
    <div v-if="view == 1">
      <v-form>
        <v-card-title class="title font-weight-regular justify-center">
          <span>Регистрация</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <a-form-model
              v-model="data"
              :model="model"
              :errors="errors"
              @validate="validate($event)"
            />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit" @click.prevent="submit()"
            >Зарегистрироваться</v-btn
          >
          <v-btn color="primary" :to="{ name: 'login' }">Войти</v-btn>
        </v-card-actions>
      </v-form>
    </div>
    <div v-if="view == 2">
      <v-card-title class="title font-weight-regular justify-center">
        <span>Регистрация</span>
      </v-card-title>
      <v-card-text>
        <p>Вы успешно зарегистрировались</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" to="/">Перейти на главную</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { validate, validators, fillForm } from "./../../components/mixings";

export default {
  mixins: [validate, validators, fillForm],
  data() {
    return {
      view: 1,
      data: {},
      model: [
        {
          name: "login",
          title: "Email",
          validator: ["req", "email", "login"],
          type: "string",
        },
        {
          name: "password",
          title: "Пароль",
          type: "password",
          validator: ["req", "pass"],
        },
        {
          name: "repassword",
          title: "Повторите пароль",
          type: "password",
          validator: ["req", "repass"],
        },
      ],
      errors: {},
    };
  },
  methods: {
    async submit() {
      if (await this.validateAll(this.data)) {
        if (await this.$axios.post("/signup/registration", this.data)) {
          await this.$root.login({
            login: this.data.login,
            password: this.data.password,
          });
          this.view = 2;
        }
      }
    },
  },
};
</script>
