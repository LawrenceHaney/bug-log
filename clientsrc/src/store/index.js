import { STATES } from "mongoose";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs:[],
    activebug:{},
    activenotes:[]
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs){
      state.bugs = bugs
    },
    setActiveBug(state, bug){
      state.activebug = bug
    },
    setActiveNotes(state, notes){
      state.activenotes = notes
    }
  },
  actions: {
    // Auth//
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    //Bugs
    async getBugs({commit}, state){
      try {
        let res = await api.get("/bugs")
        .then(data => {commit("setBugs", data.data)})
      } 
      catch (error) {
        console.error(error)}     
    },

    async addBug({commit}, bugdata, state){
      try {
        let res = await api.post("bugs", bugdata)
        router.push({ name: "Details", params: { bugId: res.data._id } })
      } 
      catch (error) {
        console.error(error)
        
      }
    },
    async getBugById({commit}, id){
      try { let res = await api.get("bugs/" + id)
        commit("setActiveBug", res.data)
      } catch (error) {
        
      }
    },
    

    //Notes
    async addNote({commit}, note, state){
      try {
        let res = await api.post("notes", note)
          console.log(res)
      } 
      catch (error) {
        console.error(error)
        
      }
    },
    async getNotes({commit},id, state){
      try {
        let res = await api.get("/bugs/" + id + "/notes")
          .then(data => {commit("setActiveNotes", data.data)})
      } 
      catch (error) {
        console.error(error)}     
    },
  }
});