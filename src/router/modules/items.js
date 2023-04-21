import Layout from '@/layout'

const itemsRouter = {
  path: '/Items',
  component: Layout,
  redirect: '/Items',
  name: 'Items',
  meta: {
    title: '物品配置',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'pet-info',
      component: () => import('@/viewss/Items/petInfo'),
      name: 'pet',
      meta: { title: '宠物配置' }
    },
    {
      path: 'treasure-info',
      component: () => import('@/viewss/Items/treasureInfo'),
      name: 'treasure',
      meta: { title: '道具配置' }
    },
    {
      path: 'yesheng-info',
      component: () => import('@/viewss/Items/yeshengInfo'),
      name: 'yesheng',
      meta: { title: '野生物品配置' }
    },
    {
      path: 'siliao-info',
      component: () => import('@/viewss/Items/siliaoInfo'),
      name: 'siliao',
      meta: { title: '饲料物品配置'}
    },
    {
      path: 'buzhuo-info',
      component: () => import('@/viewss/Items/buzhuoInfo'),
      name: 'buzhuo',
      meta: { title: '捕捉装备配置'}
    },
    {
      path: 'zhandou-info',
      component: () => import('@/viewss/Items/zhandouInfo'),
      name: 'zhandou',
      meta: { title: '战斗装备配置'}
    }
  ]
}

export default itemsRouter