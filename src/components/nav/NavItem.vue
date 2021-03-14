<template>
    <li class="nav-item" @mouseenter="mouseenter" @mouseleave="mouserout">
        <div> {{routeName}}</div>
        <div v-show="isShow" class="nav-item__panel">
           <LinkItem v-for="item2 in routerItem.children" :key="item2.path" :routeName="item2.name" ></LinkItem>
        </div>
    </li>
</template>

<script>
import { getAndPushRouters } from '@/utils/tools'
import LinkItem from '@/components/nav/LinkItem'

export default {
  name: 'NavItem',
  components: { LinkItem },
  props: {
    routeName: {
      type: String,
      default: ''
    },
    routerItem: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShow: false,
      timer: 0
    }
  },
  methods: {
    mouseenter () {
      this.isShow = true
      if (this.routerItem.children.length === 0) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          getAndPushRouters(this.routeName, this.routerItem.meta.id).then(res => {
            console.log(111)
          })
        }, 300)
      }
    },
    mouserout () {
      this.isShow = false
    }
  }
}
</script>

<style>
.nav-item {
    position: relative;
    left: 0;
    top: 0;
    width: 100px;
    border: 1px solid #ccc;
}
.nav-item__panel {
    position: absolute;
    left: 100px;
    top: 0;
    width: 200px;
    height: 200px;
    background: #fff;
    border: 1px solid #ccc;

}
</style>
