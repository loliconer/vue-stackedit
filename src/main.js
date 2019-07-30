import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  components: { App },
  mounted() {
    App.methods.setContent('hello')
  }
}).$mount('app')
