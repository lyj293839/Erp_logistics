import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import customer from "./customer";
import admin from "./admin";
import ElementUI from 'element-ui'
// import All from '../common/All'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: 'home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/components/Home'),
          meta: { 
            title:'首页',
            keepAlive: true,
          }
        },
        {
          path: '/chemical',
          name: 'chemical',
          redirect: '/chemical_class',
          component: () => import('../components/components/Chemical/index'),
          children:[
            {
              path: '/chemical_class',
              name: 'chemical_class',
              component: () => import('../components/components/Chemical/class'),
              meta: { 
                title:'化学性质',
              }
            },{
              path: '/chemical_list',
              name: 'chemical_list',
              component: () => import('../components/components/Chemical/list'),
              meta: { 
                title:'化学性质',
              }
            },{
              path: '/chemical_detail',
              name: 'chemical_detail',
              component: () => import('../components/components/Chemical/chemical_detail'),
              meta: { 
                title:'化学性质及安全信息',
              }
            },{
              path: '/hs_detail',
              name: 'hs_detail',
              component: () => import('../components/components/Chemical/hs_detail'),
              meta: { 
                title:'海关编码'
              }
            }
          ]
        },
        
        
        // {
        //   path: '/hs',
        //   name: 'hs',
        //   component: () => import('../components/components/Hs/index'),
        //   meta: { 
        //     title:'海关编码',
        //     keepAlive: true,
        //   }
        // },
        // {
        //   path: '/hs_list',
        //   name: 'hs_list',
        //   component: () => import('../components/components/Hs/hs_list'),
        //   meta: { 
        //     title:'海关编码',
        //   }
        // },
        
      ]
    },
    ...customer,
    ...admin
  ]
})
// 路由前置导航守卫
router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'物流系统'
  if(to.meta.isLogin){
    let loginForm = JSON.parse(localStorage.getItem('loginForm'));
    if(loginForm){
      let role_type = loginForm.role_type.toString();
      if(to.meta.role_type.filter(i=>{return i===role_type}).length>0){
        next()
      }else{
        ElementUI.Message.error('没有权限，请重新选择登录账户');
        next({path:from.path})
      }
    }else{
      next({path:from.path,query:{no_login:true}})
    }
  }else{next()}
})
// router.beforeEach((to,from,next)=>{ 
  // All.goTop()
  // if(to.meta.isLogin){
  //   let token = localStorage.getItem('token');
  //   if(!token){
  //     if (!from.query.noLogin) {
  //       let toQuery = from.query?JSON.parse(JSON.stringify(from.query)):{}
  //       toQuery.noLogin = true
  //       next({
  //         path: from.path,
  //         query: toQuery
  //       })
  //     } else {
  //       next({path: from,})
  //     }
  //   }else{
  //     next()
  //   }
  // }else{
  //   next()
  // }
// })
export default router;
