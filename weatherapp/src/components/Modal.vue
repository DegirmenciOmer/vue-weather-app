<template>
  <div class="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter Location</label>
      <input
        type="text"
        placeholder="Search City"
        v-model="city"
        name="city-name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return { city: null }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    color: #fff;
  }
  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
  }
  input {
    color: #fff;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #fff;
    width: 100%;
    padding: 6px 4px;
    margin: 10px 0 20px;

    &:focus {
      outline: none;
    }
    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
    }
  }
}
</style>
