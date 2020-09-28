<template>
  <div class="home container-fluid background">
    <div class="row">
      <form @submit.prevent="addBug" class="bg-secondary col-12">
          <div class="row justify-content-around">
          <input type="text" placeholder="title" v-model="newBug.title" required class="col-10 m-1" />
          <textarea type="text" placeholder="description" v-model="newBug.description" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1 fade-in col-10">Create Bug</button>
          </div>
    </form>
    </div>
      <div class="spacer"></div>
    <div class="row justify-content-center">
      <div class="col-10">
<div class="row justify-content-around p-2 bg-danger text-pop">
    <h1 class="col-12 text-center border-bottom border-dark p-1">Bugs</h1>
    <div class="col-4"><h4>
    Title
    </h4></div>
    <div class="col-4"><h4>
    Creator
    <br>
    Modified Date:
    </h4></div>
    <div class="col-4"><h4> Status:</h4> <button type="button" class="btn btn-primary" @click="sortBugs">Fliter</button></div> </div>
      </div>
      <div class="col-10">
        <div class="row justify-content-center">
        <bug class="col-12 bug-container align-items-center my-2 pop" v-for="bug in bugs" :key="bug.id" :bugData="bug"></bug>
    </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import bug from "../components/bug.vue"
export default {
  name: "home",
  computed: {
    bugs(){
      if(this.closedtoggle){
        return this.$store.state.bugs
      }
      else if(this.opentoggle)
        return this.$store.state.bugs.filter(b => b.closed == false)
      else{
        return this.$store.state.bugs.filter(b => b.closed == true)
      }
    }
  },
  data(){
    return{
      closedtoggle: true,
      opentoggle: true,
      newBug: {
        closed: false,
        title: "",
        description: ""
      },
    }
  },
  methods: {
    addBug(){
      this.$store.dispatch("addBug", this.newBug)
    },
    sortBugs(){
      if(this.closedtoggle == true){
      this.closedtoggle = !this.closedtoggle}
      else if (this.opentoggle == true) {
        this.opentoggle = !this.opentoggle
        
      } else {
        this.opentoggle = !this.opentoggle
        this.closedtoggle = !this.closedtoggle
      }

    }
  },
  mounted(){
    this.$store.dispatch("getBugs")
  },
  components:{
    bug
  }
};
</script>
