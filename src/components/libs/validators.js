export default {
  methods: {
    validator: async function (types, key, fields) {
      if (Array.isArray(types) && types.length > 0) {
        const value = fields[key];
        var ferror = '';
        for (var el of types) {
          if (el == 'req' && (value === '' || value === null || value === undefined)) {
            ferror = 'Это поле обязательно.'
          } else if (el == 'pass' && value && value.length < 6) {
            ferror = 'Пароль не менее 6 символов.'
          } else if (el == 'email' && value && value != '' && !this.validEmail(value)) {
            ferror = 'Укажите корректный адрес электронной почты.'
          } else if (el == 'login' && !(fields['id'] > 0)) {
            if (await this.validLogin(value, '/signup/login_exists')) {
              ferror = 'Такой пользователь уже существует'
            }
          } else if (el == 'repass' && value != fields['password']) {
            ferror = 'Пароли не совпадают.'
          } else if (el == 'reemail' && value != fields['email']) {
            ferror = 'Адреса почты не совпадают'
          }
          if (ferror != "") {
            return ferror
          }
        }
      }
      return ""
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async validLogin (login, api) {
      let response = await this.$axios.get(api, {
        params: { login: login },
      });
      return response.data.data;
    }
  }
}