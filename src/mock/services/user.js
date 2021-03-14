import { mock } from 'mockjs'
import { builder, getQueryParameters } from '../util'

// 获取用户菜单
mock(/\/userMenu/, 'get', (options) => {
  const params = getQueryParameters(options)
  if (params.id === '0') {
    return builder(mock([
      {
        pMenuId: 0,
        id: 1,
        uri: 'product',
        code: 'product',
        name: '商品',
        logoUrl: 'icon_product',
        isShow: true // 是否显示在菜单
      }
    ]))
  } else {
    return builder(mock([
      {
        pMenuId: 1,
        id: 2,
        uri: 'productList',
        code: 'productList',
        name: '商品列表',
        logoUrl: 'icon_product',
        isShow: true // 是否显示在菜单
      },
      {
        pMenuId: 1,
        id: 3,
        uri: 'productDetail',
        code: 'productDetail',
        name: '商品详情',
        logoUrl: 'icon_product',
        isShow: false // 是否显示在菜单
      }
    ]))
  }
})
