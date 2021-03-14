import { userMenu } from '@/api'
import router from '@/router'
import stage from 'store'
import store from '@/store'
import { generatorDynamicRouter } from '@/router/generator-routers'
/**
 * 获取数据树的某一个对象
 */
export function getObject (array, key, value) {
  let o
  array.some(function iter (a) {
    if (a[key] === value) {
      o = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  })
  return o
}
// 获取菜单数据和构建路由
export const getAndPushRouters = (parentName, parentId) => {
  return new Promise((resolve, reject) => {
    userMenu({ params: { id: parentId } }).then((res) => {
      // 如果找不到菜单数据或者菜单数据为空
      if (!res.data.data || res.data.data.length === 0) {
        reject(new Error('找不到页面'))
        return
      }
      stage.set('userMenu', [].concat(stage.get('userMenu') ?? [], res.data.data))
      gRouter(parentName, res.data.data, parentId).then(() => {
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  })
}
export const gRouter = (parentName, data, parentId) => {
  return new Promise((resolve, reject) => {
    generatorDynamicRouter(data, parentId).then(routes => {
      routes.forEach(item => {
        router.addRoute(parentName, item)
      })
      const storeRoutes = store.getters.addRoutes
      if (parentId === 0) {
        store.dispatch('setAddRoutes', [].concat(storeRoutes, routes))
      } else {
        const obj = getObject(storeRoutes, 'name', parentName)
        obj.children = [].concat(obj.children, routes)
        store.dispatch('setAddRoutes', storeRoutes)
      }

      resolve(true)
    }).catch(err => {
      reject(err)
    })
  })
}
