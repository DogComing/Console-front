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
      path: 'capture-probability',
      component: () => import('@/viewss/Configuration/captureProbability'),
      name: 'captureProbability',
      meta: { title: '地图配置' }
    },
    // {
    //   path: 'qian-dao',
    //   component: () => import('@/viewss/Configuration/qianDao'),
    //   name: 'qianDao',
    //   meta: { title: '签到配置' }
    // },
    {
      path: 'pingtai',
      component: () => import('@/viewss/Configuration/pingtai'),
      name: 'pingtai',
      meta: { title: '平台配置' }
    }
  ]
}

export default peiZhiRouter