## 说明

如何处理动态菜单和路由的例子
当前例子只做 2 级菜单示例，多级菜单可自行扩展
考虑：

- 刷新页面
- 退出登录，清理数据
- 多层嵌套

## 获取用户菜单，一次性获取不行非要层层拆分(简单的东西放到前端变复杂了)，但不是没有解决方案(珍爱生命)

注意：三级以上菜单那就需要树级调用层层遍历，

## 1.首先看接口设计

1.获取用户菜单接口

```tsx
// 请求参数
type Params = {
	parentId: number
}
// 返回结果
type DataItem = {
	parentId: number
	id: number
	uri: string
	code: string
	name: string
	icon: string
	isShow: boolean // 是否显示在菜单
}
type Data = [DataItem]
// 例子
[
	{
		parentId: 0,
		id: 1,
		uri: 'product',
		code: 'product'
		name: '商品',
		icon: 'icon_product',
		isShow: true // 是否显示在菜单
	},
	{
		parentId: 1,
		id: 2,
		uri: 'productList',
		code: 'productList'
		name: '商品列表',
		icon: 'icon_product',
		isShow: true // 是否显示在菜单
	},
	{
		parentId: 1,
		id: 3,
		uri: 'productDetail',
		code: 'productDetail'
		name: '商品详情',
		icon: 'icon_product',
		isShow: false // 是否显示在菜单
	},
]
```

2. 获取菜单详情

```tsx
// 请求参数
type Params = {
  id?: number;
  code?: string; // 菜单唯一标志，不可重复
};
// 返回结果
type data = {
  parentId: number; //上级id
  id: number; // 当前id
  uri: string; // 路由uri
  code: string;
  name: string; // 菜单名字
  icon: string; // 菜单图标
  isShow: string; // 是否显示在菜单
};
```

## 2. 数据和菜单的数据结构

### 菜单 code 和页面组件的映射关系，前端代码，将用来构建成路由

```tsx
const routeMap = {
  product: {
    des: "商品", // 中文描述，只是一个辅助作用
    name: "Product", // 页面组件的name，用来keepAlive实现多页标签
    component: Router, // 空白路由
    keepAlive: true,
    localTitle: "menu.product.index",
  },
  productList: {
    des: "商品列表", // 中文描述，只是一个辅助作用
    name: "ProductList", // 页面组件的name，用来keepAlive实现多页标签
    component: () =>
      import(
        /* webpackChunkName: "productList" */ "@/views/product/productList.vue"
      ),
    keepAlive: true,
    localTitle: "menu.product.list",
  },
  productList: {
    des: "商品详情", // 中文描述，只是一个辅助作用
    name: "ProductList", // 页面组件的name，用来keepAlive实现多页标签
    component: () =>
      import(
        /* webpackChunkName: "productDetail" */ "@/views/product/productDetail.vue"
      ),
    keepAlive: true,
    localTitle: "menu.product.detail",
  },
};
```

## 3. 将数据和 routeMap 构建成前端路由菜单后的结构

```tsx
[
	path: '/',
	meta: {},
	chilren: [
		{
			path: 'home',
			component: () => import('@/views/home/index'),
			meta: {
				title: 'menu.home',
				keepAlive: true,
				des: '首页',
				id: 11,
				parentId: 0,
				target: ''
			}
		},
		{
			name: 'product', // routeMap key
			path: '/product', // uri
			component: Router, // component
			meta: {
				title: 'menu.product.index',
				keepAlive: true,
				des: '商品',
				id: 1,
				parentId: 0,
				target: '',
				permission: 'product'// 对应code
			}
		},
		{
			name: 'productList', // 对应routeMap的key
			path: '/productList', // uri
			component: () => import(/* webpackChunkName: "productList" */ '@/views/product/productList.vue'),
			meta: {
				title: 'menu.product.list',
				keepAlive: true,
				des: '商品列表',
				id: 2,
				parentId: 1,
				target: '',
				permission: 'productList' // 对应code
			}
		},
		{
			name: 'productDetail', // 对应routeMap的key
			path: '/productDetail', // uri
			component: () => import(/* webpackChunkName: "productDetail" */ '@/views/product/productDetail.vue'),
			meta: {
				title: 'menu.product.detail',
				keepAlive: true,
				des: '商品详情',
				id: 3,
				parentId: 1,
				target: '', // 是否调整
				permission: 'productDetail' // 对应code
			}
		}

	]
]
```

## 构建

数据结构完了，那么什么时候处理这些数据怎么构建

- 登录—我们只需要获取到 token，存储在 localStage 里
- 路由钩子，先看流程

# route-demo

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
