import axios from 'axios'
const cookieparser = require('cookieparser')
import Cookie from 'js-cookie'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  token(state, data) {
    state.token = data
  },
  user(state, data) {
    state.user = data
  }
}

export const actions = {
  login({ commit }, { identifier, password }) {
    return axios
      .post('/auth/local', {
        identifier,
        password
      })
      .then(response => {
        // set cookie for server side
        Cookie.set(process.env.authCookieName, {
          user: response.data.user,
          token: response.data.jwt
        })
        // set store for client side
        commit('user', response.data.user)
        commit('token', response.data.jwt)
        return response.data
      })
  },
  logout({ commit }) {
    Cookie.remove(process.env.authCookieName)
    commit('user', null)
    commit('token', null)
  },
  register({ rootGetters }, { username, email, password }) {
    return axios
      .post('/auth/local/register', {
        username,
        email,
        password
      })
      .then(r => r.data)
  },
  /**
   * This function is called from server side only.
   * The only way to get our auth cookie from server side is
   * to inspect the incoming request and check for a cookie header.
   */
  nuxtServerInit({ commit, getters }, { req }) {
    if (req.headers.cookie && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      if (parsed[process.env.authCookieName]) {
        // We find our user cookie ! let's hydrate the store with its data.
        const authData = JSON.parse(parsed[process.env.authCookieName])
        commit('user', authData.user)
        commit('token', authData.token)
      }
    }
  }
}
