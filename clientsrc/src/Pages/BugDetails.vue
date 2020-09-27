<template>
  <div class="container-fluid bg-dark">
    <div v-if="!activeBug" class="div"> loding ...</div>
    <div v-else class="row">
      <div class="card col-3 bg-light">
        <h1>
          {{activeBug.title}}
        </h1>
          <h6>
            {{activeBug.creatorEmail}}
          </h6>
        </div>
      <div class=" card col-9 bg-light p-4">
        <p v-if="activeBug.closed == false"> open</p>
    <p v-else>closed</p>
        <p>
        {{activeBug.description}}
        </p>
        <button type="button" @click="closeBug" class="btn btn-outline-danger">Close Bug</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 d-flex bg-light">
        <div v-for="note in notes" :key="note.id" class="notes">{{note.content}}</div>
      </div>
      <div class="col-10">
        <form @submit.prevent="addNote" class="bg-secondary">
          <input type="text" :placeholder="newNote.content" v-model="newNote.content" required class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1 fade-in">Create Bug</button>
    </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BugDetails",
  mounted(){
    this.$store.dispatch("getBugById", this.$route.params.bugId)
    this.$store.dispatch("getNotes", this.$route.params.bugId)

  },
  computed: {
    activeBug(){
      return this.$store.state.activebug
    },
    notes(){
      return this.$store.state.activenotes
    }
  },
  data(){
    return{
      newNote: {
          content: "words here",
          bug: this.$route.params.bugId,
          flagged: "pending" }
    }
  },
  methods:{
    addNote(){
      this.$store.dispatch("addNote", this.newNote)
    },
    closeBug(){
      this.$store.dispatch("deleteBug", this.$route.params.bugId)
    }
  }

}
</script>

<style>

</style>