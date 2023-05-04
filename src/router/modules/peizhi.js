import Layout from '@/layout'

const peiZhiRouter = {
  path: '/Configuration',
  component: Layout,
  redirect: '/Configuration',
  name: 'Configuration',
  meta: {
    title: '配置',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'pingtai',
      component: () => import('@/viewss/Configuration/pingtai'),
      name: 'pingtai',
      meta: { title: '平台配置' }
    },
    {
      path: 'map',
      component: () => import('@/viewss/Configuration/map'),
      name: 'map',
      meta: { title: '地图配置' }
    },
    {
      path: 'probability',
      component: () => import('@/viewss/Configuration/probability'),
      name: 'probability',
      meta: { title: '捕捉概率配置' }
    },
    // {
    //   path: 'ad',
    //   component: () => import('@/viewss/Configuration/ad'),
    //   name: 'ad',
    //   meta: { title: '广告配置' }
    // },
    // {
    //   path: 'qian-dao',
    //   component: () => import('@/viewss/Configuration/qianDao'),
    //   name: 'qianDao',
    //   meta: { title: '签到配置' }
    // },
  ]
}

export default peiZhiRouter