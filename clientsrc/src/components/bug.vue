<template>
  <router-link :to="{name: 'Details', params: {bugId: bugData.id}}" class="row justify-content-around p-2 text-pop-small">
    <div class="col-4"><p>
      {{bugData.title}}
    </p></div>
    <div class="col-4"><p>
    {{bugData.creatorEmail}}
    <br>
    {{bugData.closedDate}}
    {{bugData.createdAt}}
    </p></div>
    <div class="col-4"><p class="text-success" v-if="bugData.closed == false"> open</p>
    <s class="text-danger" v-else>closed</s></div>
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