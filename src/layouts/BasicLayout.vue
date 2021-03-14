<template>
  <div class="container">
    <ANav/>
    <div class="page">
      页面
       <router-view />
    </div>

  </div>
</template>

<script>
import ANav from '@/components/nav/ANav'

export default {
  name: 'BasicLayout',
  components: {
    ANav
  },

  data () {
    return {
      a: 1
    }
  }

}
</script>
<style>
  .container {
    display: flex;
    flex-direction: row;
  }
  .page {
    flex: 1;
    height: 100vh;
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
