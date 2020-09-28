<template>
  <div class="container-fluid background">
    <div v-if="!activeBug" class="div"> loding ...</div>
    <div v-else class="row justify-content-center">
      <div class="card col-3 bg-light">
        <h1>
          {{activeBug.title}}
        </h1>
          <h6>
            {{activeBug.creatorEmail}}
          </h6>
          <button v-if="activeBug.closed == false" @click="editBug" type="button" class="btn btn-outline-success">Edit</button>
        </div>
      <div class=" card col-7 bg-light p-4">
        <p v-if="activeBug.closed == false" class="text-success text-right"> open</p>
        <p v-else class="text-danger text-right">closed</p>
        <p>
        {{activeBug.description}}
        </p>
        <button v-if="activeBug.closed == false" type="button" @click="closeBug" class="btn btn-outline-danger">Close Bug</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-if="notes.length > 0" class="col-10 bg-light">
        <note v-for="note in notes" :key="note.id" class="notes" :noteData="note" />
      </div>
      <div v-else class="spacer col-10 bg-light d-flex justify-content-around">
        <p class="muted align-self-center">nothing here boss</p>
      </div>
      <div class="col-10 bg-secondary pt-5">
        <form @submit.prevent="addNote" class="justify-content-around">
          <input type="text" :placeholder="newNote.content" v-model="newNote.content" required class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1 fade-in">Create Note</button>
    </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import note from '../components/note'
export default {
  name: "BugDetails",
    data(){
      return{
        newNote: {
            content: "words here",
            bug: this.$route.params.bugId,
            flagged: "pending" 
          },
        newBug: { id: this.$route.params.bugId}
      }
    },
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
  components:{
    note
  },
  methods:{
    addNote(){
      this.$store.dispatch("addNote", this.newNote)
    },
    closeBug(){Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, close it!'
}).then((result) => {
  if (result.isConfirmed) {
    this.$store.dispatch("deleteBug", this.$route.params.bugId)
    Swal.fire(
      'Hope you fixed it!',
      'Your Bug has been closed.',
      'success'
    )
  }
})},

    
    editBug(){
      	Swal.fire({
          title: 'Edit bug',
          html:
            '<h6>Edit title</h6>' +
            '<input id="swal-input1" class="swal2-input" v-model="newBug.title">' +
            '<h6>Edit Description</h6>' +
            '<input id="swal-input2" class="swal2-input" v-model="newBug.description">',
            focusConfirm: false,
          preConfirm: () => {
            this.newBug.title= document.getElementById('swal-input1').value,
            this.newBug.description= document.getElementById('swal-input2').value
  }
}).then((result) => {
          if (result.isConfirmed) {
            console.log(this.newBug)
            this.$store.dispatch("editBug", this.newBug)
            Swal.fire({
              title: 'Edit!',
              text: 'Your Bug has been edited.',
              confirmButtonText: 'OK',
              icon: 'success'
            })
          }
        })
  }
    
  }
}
</script>

<style>

</style>
