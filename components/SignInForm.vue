<template>
  <form @submit.prevent="onSubmit">

    <div class="message is-danger" v-if="requestStatus === 'FINISHED_ERROR'">
      <div class="message-body"> Authentication failed :  {{requestError}} </div>
    </div>

    <div class="field">
      <label class="label">Identifier</label>
      <div class="control">
        <input 
        v-model="identifier" 
        type="text" 
        class="input is-large" />  
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input 
        v-model="password" 
        type="password" 
        class="input is-large" />  
      </div>
    </div>

    <button 
    type="submit" 
    class="button is-large is-primary" 
    :class="{'is-loading': requestStatus === 'PENDING'}"
    >
    Login
    </button>

  </form>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  data() {
    return {
      requestStatus: 'NOT_STARTED',
      requestError: null,
      identifier: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.requestStatus = 'PENDING'
      this.requestError = null
      const authData = {
        identifier: this.identifier,
        password: this.password
      }
      this.$store
        .dispatch('auth/login', authData)
        .then(r => {
          this.requestStatus = 'FINISHED_OK'
          this.$emit('success')
        })
        .catch(e => {
          this.requestStatus = 'FINISHED_ERROR'
          if (e.response && e.response.data) {
            this.requestError = e.response.data.message
          } else {
            this.requestError = e.message
          }
        })
    }
  }
}
</script>
