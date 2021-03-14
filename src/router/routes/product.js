import RouteView from '@/layouts/RouteView'
const productRoues = {
  product: {
    des: '商品', // 中文描述，只是一个辅助作用
    name: 'Product', // 页面组件的name，用来keepAlive实现多页标签
    component: RouteView, // 空白路由
    keepAlive: true,
    localTitle: 'menu.product.index'
  },
  productList: {
    des: '商品列表', // 中文描述，只是一个辅助作用
    name: 'ProductList', // 页面组件的name，用来keepAlive实现多页标签
    component: () => import(/* webpackChunkName: "productList" */ '@/views/product/ProductList'),
    keepAlive: true,
    localTitle: 'menu.product.list'
  },
  productDetail: {
    des: '商品详情', // 中文描述，只是一个辅助作用
    name: 'ProductList', // 页面组件的name，用来keepAlive实现多页标签
    component: () => import(/* webpackChunkName: "productDetail" */ '@/views/product/ProductDetail'),
    keepAlive: true,
    localTitle: 'menu.product.detail'
  }
}

export default productRoues
