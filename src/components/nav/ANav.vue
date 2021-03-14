<script>
import { mapGetters } from 'vuex'
import NavItem from '@/components/nav/NavItem'

export default {
  name: 'ANav',
  computed: {
    ...mapGetters(['addRoutes'])
  },
  render () {
    const { addRoutes } = this
    return (
      <ul class="nav">
        <h2>菜单</h2>
        {
          addRoutes.map(item => (
            <NavItem routeName={item.name} key={item.path} routerItem={item}>

            </NavItem>
          ))
        }
      </ul>
    )
  }
}
</script>

<style>
    .nav {
        width: 200px;
        height: 100vh;
        border: 1px solid #ccc;
        padding: 10px;
        margin: 0;
    }
</style>
