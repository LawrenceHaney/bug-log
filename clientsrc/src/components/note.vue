<template>
  <div class="row justify-content-between">
    <div class="col-3">{{noteData.content}}</div>
    <div class="col-3">{{noteData.creator.name}}</div>
    <div class="col-3"><i class="fa fa-times" aria-hidden="true" @click="deleteNote"></i></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name:"note",
  props:["noteData"],
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
    }
  }

}
</script>

<style>

</style>