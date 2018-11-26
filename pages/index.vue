<template>
  <div class="container">
    <section class="section">
      <h1 class="title is-2 has-text-centered">Mer 🌊</h1>
      <Users :users="users"/>
    </section>
  </div>
</template>

<script>
import Users from '../components/Users'
export default {
  components: {
    Users
  },
  data() {
    return {
      users: []
    }
  },
  asyncData({ store }) {
    return store.dispatch('users/find').then(users => {
      return {
        users
      }
    })
  }
}
</script>



