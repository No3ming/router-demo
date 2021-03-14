// eslint-disable-next-line
import { BasicLayout } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: []
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'home',
        hidden: true,
        meta: {
          title: 'menu.home',
          keepAlive: true,
          des: '首页',
          id: -1,
          parentId: -1,
          target: ''
        }
      }
    ]
  }

]
