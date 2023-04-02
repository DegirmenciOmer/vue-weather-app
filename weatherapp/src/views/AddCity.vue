<template>
  <div></div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'AddCity',
  props: ['cities'],
  created() {
    console.log(this.cities)
  },
  components: {},
}
</script>
