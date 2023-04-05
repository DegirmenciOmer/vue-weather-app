<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" />
    <Navigation v-on:add-city="toggleModal" v-on:toggle-edit="toggleEdit" />
    <router-view v-bind:cities="cities" v-bind:editOpen="editOpen" />
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
      url: '',
      editOpen: false,
    }
  },
  methods: {
    getCurrentWeather() {
      let firebaseDB = db.collection('cities')

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (
            // run only for the existing cities
            doc.type === 'added' &&
            !doc._delegate.doc.metadata.hasPendingWrites
          ) {
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
            } catch (error) {
              console.log(error)
            }
          } else {
            // run only when the new city is added
            this.cities.push(doc.doc.data())
          }
        })
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
    toggleEdit() {
      this.editOpen = !this.editOpen
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
