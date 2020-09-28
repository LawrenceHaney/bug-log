<template>
  <div class="bg-dark text-pop row justify-content-between p-3 m-4 content-shadow">
    <div class="col-4">{{noteData.creator.name}}</div>
    <div class="col-6">{{noteData.content}}</div>
    <div class="col-1"><i class="fa fa-pen" aria-hidden="true" @click="editNote"></i></div>
    <div class="col-1"><i class="fa fa-times" aria-hidden="true" @click="deleteNote"></i></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name:"note",
  props:["noteData"],
  data(){
    return{
      newNote: {
            content: "words here",
            bug: this.$route.params.bugId,
            flagged: "pending" 
          }
    }
  },
  methods:{
    deleteNote(){Swal.fire({
          title: 'Are you sure you want to delete this note?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'var(--danger)',
          cancelButtonColor: 'var(--success)',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("deleteNote", this.noteData)
            Swal.fire({
              title: 'Deleted!',
              text: 'Your note has been deleted.',
              confirmButtonText: 'OK',
              icon: 'success'
            })
          }
        })
    },
    editNote(){
      	Swal.fire({
          title: 'Edit Note',
          html:
            '<input id="swal-input1" class="swal11-input">',
            focusConfirm: false,
          preConfirm: () => {
            this.newNote.content= document.getElementById('swal-input1').value
  }
}).then((result) => {
          if (result.isConfirmed) {
            this.newNote.id = this.noteData.id
            this.$store.dispatch("editNote", this.newNote)
            Swal.fire({
              title: 'Edit!',
              text: 'Your note has been edited.',
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