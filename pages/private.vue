<template>
  <div class="container section">
    welcome on this private page, <em>{{user.username}}</em>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>
