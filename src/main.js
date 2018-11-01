import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  components: { App },
  methods: {
    getContent() {
      this.$modal({
        content: App.methods.getContent()
      })
    }
  },
  mounted() {
    App.methods.setContent('hello')
  }
}).$mount('#app')
