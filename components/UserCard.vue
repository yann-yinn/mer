<template>
  <div>
    <h2>{{user.username}}</h2>
  </div>
</template>

<script>
import UserCard from './UserCard'
export default {
  components: {
    UserCard
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card:hover {
  transition: all 0.2s ease-in-out;
  top: -5px;
  box-shadow: 0 2px 20px;
}
.card {
  height: 100%;
  position: relative;
  transition: all 0.3s ease-in-out;
  top: 0;
}
