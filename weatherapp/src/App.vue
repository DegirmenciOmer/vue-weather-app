<template>
  <div id="app"></div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import db from './firebase/firebaseinit'

export default {
  name: 'App',
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      city: 'Detroit',
      cities: [],
    }
  },
  methods: {
    getCurentWeather() {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=no`
        )
        .then((res) => {
          console.log(res.data)
        })

      console.log(this.apiKey, db)
    },
  },
  created() {
    this.getCurentWeather()
  },
  components: {},
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
