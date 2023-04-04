<template>
  <div class="main">
    <Modal v-if="modalOpen" />
    <Navigation v-on:add-city="toggleModal" />
    <router-view v-bind:cities="cities" />
  </div>
</template>

<script>
// https://youtu.be/KtpGSsliUW8?t=786
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import db from './firebase/firebaseinit'
import Navigation from './components/Navigation'
import Modal from './components/Modal'

export default {
  name: 'App',
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      city: 'Detroit',
      cities: [],
      modalOpen: false,
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
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
  },
  created() {
    this.getCurrentWeather()
  },
  components: { Navigation, Modal },
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
  background-color: #31363d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
