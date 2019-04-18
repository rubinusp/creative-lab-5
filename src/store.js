import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drag: null,
    user: null,
    pokedex: null,
    requesting: true,
    teams: null,
  },
  mutations: {
    setDrag(state, drag) {
      state.drag = drag;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPokedex(state, pokedex) {
      state.pokedex = pokedex;
    },
    setRequesting(state, requesting) {
      state.requesting = requesting;
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
  },
  actions: {
    requestPokedex(context) {
      context.commit("setRequesting", true);
      axios.get("https://pokeapi.co/api/v2/pokedex/1")
           .then(response => {
              context.commit("setPokedex", response.data);
	      context.commit("setRequesting", false);
              return "";
           })
           .catch(error => {
              return error;
           })
    },	  
    async onDragPokemon(context, pokemon) {
      context.commit('setDrag', pokemon);
    },
    async register(context, body) {
      try {
	let response = await axios.post("/api/users", body);
	context.commit('setUser', response.data);
	return "";
      } catch (error) {
	return error.response.data.message;
      }
    },
    async login(context, body) {
      try {
 	let response = await axios.post("/api/users/login", body);
	context.commit('setUser', response.data);
	return "";
      } catch (error) {
	return error.response.data.message;
      }
    },
    async logout(context) {
      try {
	await axios.delete("api/users");
	context.commit('setUser', null);
	return "";    
      } catch (error) {
	return error.response.data.message;
      }
    },
    async saveTeam(context, body) {
      try {
        await axios.post("api/teams/", body);
        return "";
      } catch (error) {
	return error.response.data.message;
      }
    },
    async getTeams(context) {
      try {
	let teams = await axios.get("api/teams/all");
	context.commit("setTeams", teams);
	return "";
      } catch (error) {
	return error.response.data.message;
      }
    },
  }
});
