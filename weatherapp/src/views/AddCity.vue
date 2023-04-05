<template>
  <div class="grid">
    <div v-for="(city, idx) in cities" v-bind:key="idx" class="city-link">
      <City v-bind:city="city" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import City from '../components/City.vue'

export default {
  name: 'AddCity',
  props: ['cities'],
  components: { City },
}
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  padding-top: 8px;
  width: 100%;
  background-color: #31363d;
  height: 100vh;
  grid-auto-rows: 250px;

  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
:
