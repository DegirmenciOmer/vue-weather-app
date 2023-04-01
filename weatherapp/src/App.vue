<template>
  <div id="app"><Navigation /></div>
</template>

<script>
// https://www.youtube.com/watch?v=0H3oUgC7OSg
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import db from './firebase/firebaseinit'
import Navigation from './components/Navigation'

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
    },
  },
  created() {
    this.getCurrentWeather()
  },
  components: { Navigation },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.main {
  height: 100vh;
  .navigation {
    z-index: 99;
    position: fixed;
    max-width: 1024px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .container {
    padding: 0 20px;
  }
}
</style>
