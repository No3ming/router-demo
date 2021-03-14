<template>
    <router-link :to="{name: routeName}" style="display: block">{{routeName}}</router-link>
</template>

<script>
export default {
  name: 'LinkItem',
  props: {
    routeName: {
      type: String,
      default: ''
    }
  }
}
</script>
