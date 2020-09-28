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
    async editBug({commit}, bug){
      try {
        let res = await api.put("bugs/" + bug.id, bug)
          commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBug({commit, state}, id,){
      try {
        if(this.state.activebug.closed == false){
        this.state.activebug.closed = true
        let update = state.activebug
        console.log(update);
        let res = await api.delete("bugs/"+ id, update)
          commit("setActiveBug", update)
          console.log(res)}
      } catch (error) {
        console.error(error)
      }
    },

    //Notes
    async addNote({ commit, dispatch }, note,){
      try {
        let res = await api.post("notes", note)
          .then(data => {dispatch("getNotes", data.data.bug)})
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
    async deleteNote({ commit, dispatch, state }, note){
      try {
        await api.delete("notes/" + note.id)
          .then(data => {commit("setActiveNotes", this.state.activenotes.filter(n => n.id != note.id))})
      } catch (error) {
        console.error(error);
        
      }
    },
    async editNote({commit, state}, note){
      try {
        let res = await api.put("notes/" + note.id, note)
          commit("setActiveNotes", [...this.state.activenotes.filter(n => n.id != res.data.id), res.data])
      } catch (error) {
        console.error(error)
      }
    }
    
  }
});
