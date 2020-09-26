<template>
  <div class="home container-fluid bg-dark">
    <div class="row">
      <form @submit.prevent="addBug" class="bg-secondary">
          <input type="text" placeholder="title" v-model="newBug.title" required class="col-10 m-1" />
          <textarea type="text" placeholder="description" v-model="newBug.description" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1 fade-in">Create Bug</button>
    </form>
    </div>
    <div class="row">
      <div class="col-10 bg-secondary">
        <div class="row d-flex">
    <bug class="col-12 bug-container" v-for="bug in bugs" :key="bug.id" :bugData="bug"></bug>
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
      return this.$store.state.bugs
    }
  },
  data(){
    return{
      newBug: {
        closed: false,
        title: "",
        description: ""
      },
    }
  },
  methods: {
    addBug(){
      // debugger
      console.log("created" + this.newBug)
      this.$store.dispatch("addBug", this.newBug)
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
