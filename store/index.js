export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { req, app }) {
    return dispatch('auth/nuxtServerInit', { req, app })
  }
}
