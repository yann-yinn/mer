<template>
  <form @submit.prevent="onSubmit">

    <div class="message is-danger" v-if="requestStatus === 'FINISHED_ERROR'">
      <div class="message-body">{{requestError}}</div>
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
      <label class="label">email</label>
      <div class="control">
        <input 
        v-model="email" 
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
    Register
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
      signUpRequestError: null,
      identifier: '',
      password: '',
      email: ''
    }
  },
  methods: {
    onSubmit() {
      this.signUpRequestError = null
      this.requestStatus = 'PENDING'
      this.$store
        .dispatch('auth/register', {
          username: this.identifier,
          password: this.password,
          email: this.email
        })
        .then(response => {
          // if register is successfull, log the user in.
          this.requestStatus = 'FINISHED_OK'
          const authData = {
            identifier: this.identifier,
            password: this.password
          }
          return this.$store.dispatch('auth/login', authData)
        })
        .then(r => {
          this.$emit('success')
        })
        .catch(e => {
          this.requestStatus = 'FINISHED_ERROR'
          if (e.response.data.message) {
            this.requestError = e.response.data.message
          } else {
            this.requestError = e.message
          }
        })
    }
  }
}
</script>
