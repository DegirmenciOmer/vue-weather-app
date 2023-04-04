<template>
  <div class="city">
    <span>{{ this.city.city }}</span>
    <div class="weather">
      <span
        >{{ Math.round(this.city.currentWeather.current.temp_c) }}&deg;</span
      >
      <!-- <img
        :src="
          require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}`)
        "
        alt=""
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'City',
  props: ['city'],
  created() {
    console.log(this.city, 'ín city compone')
  },
}
</script>

<style lang="scss" scoped>
h4 {
  color: orange;
}
</style>
