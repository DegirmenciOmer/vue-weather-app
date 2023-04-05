<template>
  <div class="city">
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
export default {
  name: 'City',
  props: ['city'],
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
