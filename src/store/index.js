import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: '',
		adapt: false,
	},
	mutations: {
		setid(state, params) {
		   state.id = params
		},
		setadapt(state, params) {
		   state.adapt = params
		},
	},
	actions: {
		SET_ID({ commit }, params) {
		    commit('setid', params)
		},
	},
	modules: {}
});
