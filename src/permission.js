import router from './router'
import stage from 'store'
import store from '@/store'
import { gRouter, getAndPushRouters } from '@/utils/tools'

const hanlderLevel1 = (menu1) => {
  return new Promise((resolve, reject) => {
    if (menu1) {
      gRouter('index', menu1, 0).then(() => {
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    } else {
      getAndPushRouters('index', 0).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    }
  })
}
const handlerLevel2 = (path) => {
  return new Promise((resolve, reject) => {
    const list = path.split('/').filter(it => it)
    const paths = []
    list.reduce((a, b) => {
      const pt = a + '/' + b
      paths.push(pt)
      return a + pt
    }, '')
    // paths = ['/product', '/product/productList', '/product/productDetail']
    let parent = null
    // 层层判断是否已经新增到动态路由中
    const hanlderPaths = (ps) => {
    // paths的最后一项都已经新增到动态路由那么触发跳转
      if (ps.length === 0) {
        resolve(false)
        return
      }
      const pt = ps.splice(0, 1)[0]
      const routes = router.getRoutes()
      const route = routes.find(item => pt === item.path)
      if (route) {
        parent = route
        hanlderPaths(ps)
        return
      }
      getAndPushRouters(parent.name, parent.meta.id).then(() => {
        hanlderPaths(ps)
      }).catch(err => {
        reject(err)
      })
    }
    hanlderPaths(paths)
  })
}
router.beforeEach((to, form, next) => {
  // 如果已经登录，会有token
  stage.set('token', '1221')
  if (stage.get('token')) {
    // 判断是否有1级菜单
    if (store.getters.addRoutes.length === 0) {
      // 查询是否存在本地路由数据
      //   console.log(to)
      // 查看本地存储是否有菜单信息，注意，在退出登录的时候要清空，切换租户的时候清理
      const menu1 = stage.get('userMenu')
      // 处理1级菜单
      hanlderLevel1(menu1).then(() => {
        // 处理多级菜单
        handlerLevel2(to.path).then((replace) => {
          // 如果是新增的路由要使用relpace
          next({ ...to, replace })
          console.log(router.getRoutes())
        }).catch(() => {
          // 出错，说明没有权限，跳转到404或者403
          next({
            name: '404'
          })
        })
      }).catch(err => {
        console.log(err)
        // 出错，说明没有权限，跳转到404或者403
        next({
          name: '404'
        })
      })
    } else {
      // 如果已经存在1级菜单
      handlerLevel2(to.path).then((replace) => {
        // 如果是新增路由，使用replace
        next(replace ? { ...to, replace } : undefined)
        console.log(router.getRoutes())
      }).catch(() => {
        // 出错，说明没有权限，跳转到404或者403
        next({
          name: '404'
        })
      })
    }
  } else {
    // next()
    window.location = 'http://login'
  }
})
