import axios from 'axios'

export const actions = {
  find() {
    return axios.get('/users').then(response => {
      return response.data
    })
  }
}
