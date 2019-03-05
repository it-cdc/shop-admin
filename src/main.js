import Vue from 'vue'
import App from './App.vue'

// 1.引入axios
import axios from 'axios';
// 1.引入element-ui
import ElementUI from "element-ui";
// 2.引入element-ui样式
import "element-ui/lib/theme-chalk/index.css";

//引入vue-router
import VueRouter from "vue-router";

//导入组件
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import GoodsList from "./pages/goods/GoodsList";
import GoodsAdd from "./pages/goods/GoodsAdd"
import CategoryList from "./pages/category/CategoryList";

//注册路由插件
Vue.use(VueRouter);


// 3.全局注册组件
Vue.use(ElementUI);

Vue.config.productionTip = false

//配置路由
const routes = [{
    path: "/",
    redirect: "/admin"
  },
  {
    path: "/login",
    component: Login,
    meta: "登录页"
  },
  {
    path: "/admin",
    component: Admin,
    meta: "管理后台",
    redirect:"/admin/goods-list",
    children: [
      {
        path: "goods-list",
        component: GoodsList,
        meta: "商品列表"
      },
      {
        path: "goods-add",
        component: GoodsAdd,
        meta: "添加商品"
      },
      {
        path: "category-list",
        component: CategoryList,
        meta: "栏目列表"
      }
    ]
  }
]

//创建路由对象
const router = new VueRouter({
  routes
});

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  //挂载路由到跟实例
  router,
  render: h => h(App),
}).$mount('#app')