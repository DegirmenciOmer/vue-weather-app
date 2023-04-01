<template>
  <div id="app"></div>
</template>

<script>
// https://youtu.be/n8xFGcYB0Jo?t=127
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
    getCurrentWeather() {
      let firebaseDB = db.collection('cities')

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${
                  this.apiKey
                }&q=${doc.doc.data().city}&aqi=no`
              )

              const data = res.data
              console.log({ data })
              firebaseDB
                .doc(doc.doc.id)
                .update({ currentWeather: data })
                .then(() => this.cities.push(doc.doc.data()))
                .then(() => console.log(this.cities))
            } catch (error) {
              console.log(error)
            }
          } else {
            console.log(doc.doc.data().city, 'daata', doc.type)
          }
        })
      })
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
    this.getCurrentWeather()
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
