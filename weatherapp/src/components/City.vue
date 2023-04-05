<template>
  <div class="city">
    <i
      @click="deleteCity"
      v-show="this.editOpen"
      class="far fa-trash-alt edit"
    ></i>
    <span>{{ this.city.city }}</span>
    <span>{{ this.city.currentWeather.current.condition.text }}</span>
    <div class="weather">
      <span
        >{{ Math.round(this.city.currentWeather.current.temp_c) }}&deg;</span
      >
      <img :src="this.city.currentWeather.current.condition.icon" alt="" />
    </div>
    <div class="video">
      <video
        autoplay
        loop
        muted
        :src="
          require(`../../public/videos/${
            this.city.currentWeather.current.condition.code +
            this.city.currentWeather.current.is_day
          }.mp4`)
        "
        alt=""
      ></video>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebaseinit'
//import axios from 'axios'
export default {
  name: 'City',
  props: ['city', 'editOpen'],
  data() {
    return {
      cityId: null,
    }
  },
  methods: {
    async deleteCity() {
      // const res = await axios.delete(
      //   `https://api.weatherapi.com/v1/current.json?key=${process.env.VUE_APP_API_KEY}&q=${this.city}&aqi=no`
      // )

      const collectionRef = db.collection('cities')
      const query = collectionRef.where('city', '==', `${this.city.city}`) // Replace 'field' and 'value' with the appropriate values for your use case
      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docId = doc.id
          const docRef = db.collection('cities').doc(docId)

          // Delete the document
          docRef
            .delete()
            .then(() => {
              console.log('Document successfully deleted!')
            })
            .catch((error) => {
              console.error('Error removing document: ', error)
            })
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .edit {
    cursor: pointer;
    border-radius: 0 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 1;
    font-size: 25px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

span {
  z-index: 1;
  text-transform: capitalize;
  display: block;
  font-size: 25px;
  font-weight: 600;
}
.weather {
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;

  span {
    font-size: 35px;
    margin-right: 8px;
  }
  img {
    height: 20px;
    width: auto;
  }
}

.video {
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  video {
    height: 100%;
    @media (min-width: 900px) {
      height: auto;
      width: 100%;
    }
  }
}
</style>
