import Vue from 'vue'
import ru from './translations/ru'

let translations = {}
Object.assign(translations, ru)

Vue.prototype.$t = function (s, lang) {
    if (!lang) lang = this.$root.lang;
    if (this.$root.config && this.$root.config.translations && this.$root.config.translations[s]) {
        return this.$root.config.translations[s];
    } else if (translations[lang] && translations[lang][s]) {
        return translations[lang][s];
    }
    else return s
}
