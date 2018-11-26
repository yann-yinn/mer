import axios from 'axios'

// A plugin alway run two times:
// first time on the server and second time in the browser
// So this is a good place to configure axios on both side
// and a good place to set the authentication header, if a token
// is present in the store.
export default ({ store }) => {
  axios.defaults.baseURL = process.env.strapiBaseUrl

  // on each request, add the token if there is one.
  axios.interceptors.request.use(
    config => {
      if (store.state.auth.token) {
        config.headers['Authorization'] = `Bearer ${store.state.auth.token}`
      }
      return config
    },
    error => Promise.reject(error)
  )
}
