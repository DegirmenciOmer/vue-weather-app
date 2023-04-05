<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="far fa-edit"></i>
        <i @click="reloadApp" class="fas fa-sync"></i>
        <i @click="addCity" class="fas fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    addCity() {
      this.$emit('add-city')
    },
    reloadApp() {
      location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  nav {
    display: flex;
    color: #fff;
    background-color: #000;
    padding: 30px 20px;
    justify-content: space-between;
  }

  .right {
    i {
      font-size: 20px;
    }
    display: flex;
    gap: 16px;
  }
  span {
    font-weight: 600;
  }
}
</style>
