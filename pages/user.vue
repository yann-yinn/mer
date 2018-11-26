<template>
  <section class="container">
      <User v-if="user" :user="user" />
  </section>
</template>

<script>
import User from '~/components/User'

export default {
  components: {
    User
  },
  middleware: 'authenticated',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

