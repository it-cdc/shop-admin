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
import GoodsAdd from "./pages/goods/GoodsAdd";
import GoodsEdit from "./pages/goods/GoodsEdit";
import CategoryList from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryEdit from "./pages/category/CategoryEdit";

import MembersList from "./pages/members/MembersList";

// 引入Vuex仓库
import store from "./store";

// // 引入富文本全局编辑器插件
// import VueQuillEditor from 'vue-quill-editor'
// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// 注册富文本插件
// Vue.use(VueQuillEditor, /* { default global options } */)

//注册路由插件
Vue.use(VueRouter);


// 3.全局注册组件 element-ui
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
        path:"goods-edit/:id",
        component: GoodsEdit,
        meta: "编辑商品"
      },
      {
        path: "category-list",
        component: CategoryList,
        meta: "栏目列表"
      },
      {
        path: "category-add",
        component: CategoryAdd,
        meta: "新增栏目"
      },
      {
        path: "category-edit/:id",
        component: CategoryEdit,
        meta: "编辑栏目"
      },
      {
        path: "members-list",
        component: MembersList,
        meta: "会员列表"
      }
    ]
  }
]

//创建路由对象
const router = new VueRouter({
  routes
});

// 给axios每次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
  //挂载路由到跟实例
  router,
  // 挂载store
  store,
  render: h => h(App),
}).$mount('#app')