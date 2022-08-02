const state = () => ({
    loading: false
})

const getters = {
    getLoadingStatus(state) {
        return state.loading
    }
}

const actions = {
    updateLoadingStatus({commit}, status) {
        commit('setLoadingStatus', status)
    }
}

const mutations = {
    setLoadingStatus(state, status) {
        state.loading = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
