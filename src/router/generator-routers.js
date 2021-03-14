// eslint-disable-next-line
// import * as loginService from '@/api/login'

// eslint-disable-next-line
import { BasicLayout, RouteView } from '@/layouts'
const files = require.context('./routes', false, /\.js$/)
let routerMap = {}
files.keys().forEach(key => {
  routerMap = { ...routerMap, ...files(key).default }
})
// 前端路由表
const constantRouterComponents = {
  ...routerMap
}

// 前端未找到页面路由（固定不用改）
// const notFoundRouter = {
//   path: '*',
//   redirect: '/404',
//   hidden: true
// }

// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: BasicLayout,
  meta: { title: 'menu.home' },
  redirect: '/home',

  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (routeData, parentId = 0) => {
  return new Promise((resolve, reject) => {
    // loginService
    //   .getCurrentUserNav(token)
    //   .then(res => {
    // console.log(routeData)
    const result = routeData.map(item => ({
      path: item.uri,
      icon: item.logoUrl,
      code: item.code,
      name: item.code,
      id: item.id,
      parentId: item.pMenuId,
      show: item.isShow,
      key: item.code,
      title: item.name
    }))
    // console.log('res', res)
    // const { result } = res
    // const menuNav = []
    const childrenNav = []
    //      后端数据, 根级树数组,  根级 PID
    listToTree(result, childrenNav, parentId)
    rootRouter.children = childrenNav
    // menuNav.push(rootRouter)
    // console.log(childrenNav)
    const routers = generator(childrenNav)
    // routers.push(notFoundRouter)
    console.log('routers', routers)
    resolve(routers)
    // })
    // .catch(err => {
    //   reject(err)
    // })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerArr
 * @param parent
 * @returns {*}
 */
export const generator = (routerArr, parent) => {
  return routerArr.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item || {}

    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.code}`,
      // 路由名称，建议唯一
      name: item.code || item.name || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: constantRouterComponents[item.code]?.component || item.component || RouteView,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: constantRouterComponents[item.code]?.title || title,
        icon: icon || undefined,
        hiddenHeaderContent,
        keepAlive: constantRouterComponents[item.code]?.keepAlive,
        target,
        permission: item.code,
        id: item.id,
        parentId: item.parentId
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理

    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    } else {
      currentRouter.children = []
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.code || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      // if (child.children.length <= 0) {
      //   delete child.children
      // }
      // 加入到树中
      tree.push(child)
    }
  })
}
