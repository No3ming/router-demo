import router from './router'
import stage from 'store'
import store from '@/store'
import { gRouter, getAndPushRouters } from '@/utils/tools'

// console.log(userMenu)
// const findRoute = (id) => {

// }

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

    let parent = null

    const hanlderPaths = (ps) => {
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
  stage.set('token', '1221')
  if (stage.get('token')) {
    // 判断是否有1级菜单
    if (store.getters.addRoutes.length === 0) {
      // 查询是否存在本地路由数据
    //   console.log(to)

      const menu1 = stage.get('userMenu')
      hanlderLevel1(menu1).then(() => {
        handlerLevel2(to.path).then((replace) => {
          // 如果是新增的路由要使用relpace
          next({ ...to, replace })
          console.log(router.getRoutes())
        }).catch(() => {
          next({
            name: '404'
          })
        })
      }).catch(err => {
        console.log(err)
        next({
          name: '404'
        })
      })
    } else {
      handlerLevel2(to.path).then((replace) => {
        next(replace ? { ...to, replace } : undefined)
        console.log(router.getRoutes())
      }).catch(() => {
        next({
          name: '404'
        })
      })
    }
  } else {
    next()
    window.location = 'http://login'
  }
})
