export default [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../components/admin/index'),
        children:[
          {
            path: '/ad_home',
            name: 'ad_home',
            component: () => import('../components/admin/components/home'),
            meta: { 
              title:'管理员-首页',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_cargo',
            name: 'ad_cargo',
            component: () => import('../components/admin/components/cargo/index'),
            meta: { 
              title:'管理员-货物操作',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_order_detail',
            name: 'ad_order_detail',
            component: () => import('../components/admin/components/cargo/order_detail'),
            meta: { 
              title:'管理员-货物操作',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_check',
            name: 'ad_check',
            component: () => import('../components/admin/components/check/index'),
            meta: { 
              title:'管理员-核算/开票',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_upload',
            name: 'ad_upload',
            component: () => import('../components/admin/components/check/upload'),
            meta: { 
              title:'管理员-核算/开票',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_enquiry',
            name: 'ad_enquiry',
            component: () => import('../components/admin/components/enquiry'),
            meta: { 
              title:'管理员-客户询价',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_express',
            name: 'ad_express',
            component: () => import('../components/admin/components/express'),
            meta: { 
              title:'管理员-快件公示',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_permission',
            name: 'ad_permission',
            component: () => import('../components/admin/components/permission'),
            meta: { 
              title:'管理员-权限管理',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_service',
            name: 'ad_service',
            component: () => import('../components/admin/components/service/index'),
            meta: { 
              title:'管理员-客户服务',
              role_type:['1','2'],
              isLogin:true
            }
          },
          {
            path: '/ad_customer_add',
            name: 'ad_customer_add',
            component: () => import('../components/admin/components/service/add'),
            meta: { 
              title:'管理员-客户服务',
              role_type:['1','2'],
              isLogin:true
            }
          },{
            path: '/ad_deliver',
            name: 'ad_deliver',
            component: () => import('../components/admin/components/deliver_file/index'),
            meta: { 
              title:'管理员-发货',
              role_type:['1','2'],
              keepAlive: true,
              isLogin:true
            }
          },{
            path: '/ad_country',
            name: 'ad_country',
            component: () => import('../components/admin/components/country'),
            meta: { 
              title:'管理员-国家管理',
              role_type:['1','2'],
              isLogin:true
            }
          },{
            path: '/ad_price',
            name: 'ad_price',
            component: () => import('../components/admin/components/price'),
            meta: { 
              title:'管理员-价格管理',
              role_type:['1','2'],
              isLogin:true
            }
          }
        ]
    },
]
