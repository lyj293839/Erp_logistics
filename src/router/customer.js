export default [
    {
        path: '/customer',
        name: 'customer',
        component: () => import('../components/customer/index'),
        // meta:{
        //   isLogin:true
        // },
        children:[
          {
            path: '/search_file',
            name: 'search_file',
            component: () => import('../components/customer/components/search_file'),
            meta: { 
              title:'我要查件',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/deliver_file',
            name: 'deliver_file',
            component: () => import('../components/customer/components/deliver_file/index'),
            meta: { 
              title:'我要发货',
              role_type:['0'],
              keepAlive: true,
              isLogin:true
            }
          },
          {
            path: '/bill',
            name: 'bill',
            component: () => import('../components/customer/components/bill'),
            meta: { 
              title:' 我的发票',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/order',
            name: 'order',
            component: () => import('../components/customer/components/order/index'),
            meta: { 
              title:'我的订单',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/order_detail',
            name: 'order_detail',
            component: () => import('../components/customer/components/order/order_detail'),
            meta: { 
              title:'我的订单',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/order_bill',
            name: 'order_bill',
            component: () => import('../components/customer/components/order/order_bill'),
            meta: { 
              title:'我的订单',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/select_pay',
            name: 'select_pay',
            component: () => import('../components/customer/components/order/select_pay'),
            meta: { 
              title:'我的订单',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/bank_pay',
            name: 'bank_pay',
            component: () => import('../components/customer/components/order/bank_pay'),
            meta: { 
              title:'我的订单',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/express',
            name: 'express',
            component: () => import('../components/customer/components/express'),
            meta: { 
              title:'快件公示',
              role_type:['0'],
              isLogin:true
            }
          },
          {
            path: '/customer_personal',
            name: 'customer_personal',
            component: () => import('../components/customer/components/customer_personal'),
            meta: { 
              title:'我的资料',
              role_type:['0'],
              isLogin:true
            }
          },
        ]
    },
]
