<template>
  <div class="container">

    <!-- Sign up modal -->
    <div class="modal" :class="{'is-active': showSignUpModal}">
      <div @click="showSignUpModal = false" class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Sign up</h2>
          <SignUpForm @success="showSignUpModal = false" />
        </div>
      </div>
      <button @click="showSignUpModal = false"  class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- sign in modal -->
    <div class="modal" :class="{'is-active': showSignInModal}">
      <div @click="showSignInModal = false" class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Login</h2>
          <SignInForm @success="showSignInModal = false" />
        </div>
      </div>
      <button @click="showSignInModal = false"  class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- navigation -->
    <nav class="navbar">
      <div class="navbar-brand">
        <div @click="showMobileMenu = !showMobileMenu" :class="{'is-active': showMobileMenu}" class="navbar-burger" data-target="app-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="app-menu" class="navbar-menu" :class="{'is-active': showMobileMenu}">
        <div class="navbar-end"> 
          <div class="navbar-item">
            <nuxt-link to="/"> Home </nuxt-link>
          </div>

          <div v-if="!user" class="navbar-item">
            <div class="buttons">
              <button @click="showSignUpModal = true" to="/signup" class="button is-primary"> Sign up </button>
              <button @click="showSignInModal = true" to="/login" class="button"> Sign in </button>
            </div>
          </div>

          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <span class="navbar-link">
              <i style="margin-right:8px" class="fas fa-user"> </i>  <strong> {{user.username}} </strong>
            </span>
            <div class="navbar-dropdown">
              <nuxt-link to="/user" @click="logout" class="navbar-item"> Profile </nuxt-link>
              <span style="cursor:pointer" @click="logout" class="navbar-item">Logout  <i style="margin-left:8px" class="fas fa-sign-out-alt"></i> </span>
            </div>
        </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
export default {
  components: {
    SignInForm,
    SignUpForm
  },
  data() {
    return {
      showSignInModal: false,
      showSignUpModal: false,
      showMobileMenu: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  },
  watch: {
    // close the mobile menu when route changed.
    $route: function() {
      this.showMobileMenu = false
    }
  },
  mounted() {}
}
</script>

<style scoped>
/* Create slide animation on mobile */
@media screen and (max-width: 999px) {
  .navbar-end {
    padding: 0.5rem 1rem;
  }

  .navbar-menu {
    display: block;
    overflow: hidden;
    max-height: 0px;
    padding: 0rem 1rem;
    transition: max-height 0.2s;
  }

  .navbar-menu.is-active {
    max-height: 100vh;
    transition: max-height 0.5s;
  }
}

.nuxt-link-exact-active {
  color: #363636;
}
</style>