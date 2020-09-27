<template>
  <router-link :to="{name: 'Details', params: {bugId: bugData.id}}" class="row justify-content-around">
    <p>
      {{bugData.title}}
    </p>
    <p>
    {{bugData.creatorEmail}}
    <br>
    {{bugData.createdAt}}
    </p>
    <p v-if="bugData.closed == false"> open</p>
    <p v-else>closed</p>
  </router-link>
</template>

<script>
export default {
  name:"bug",
  props: ['bugData'],
  data(){
    return {
      newBug: {}
    }
  },
  computed:{

  }

}
</script>

<style>

</style>