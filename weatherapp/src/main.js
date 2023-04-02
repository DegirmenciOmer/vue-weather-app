import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  components: { 'router-view': Vue.component('router-view') },
  render: (h) => h(App),
}).$mount('#app')
