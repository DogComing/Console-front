import Layout from '@/layout'

const jiLuRouter = {
  path: '/jilu',
  component: Layout,
  redirect: '/jilu',
  name: 'jilu',
  meta: {
    title: '记录查询',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'asg',
      component: () => import('@/viewss/jilu/asg'),
      name: 'asg',
      meta: { title: '用户ASG记录' }
    },
    {
      path: 'pay',
      component: () => import('@/viewss/jilu/pay'),
      name: 'pay',
      meta: { title: '用户支付记录' }
    },
    {
        path: 'rake',
        component: () => import('@/viewss/jilu/rake'),
        name: 'rake',
        meta: { title: '用户返佣记录' }
    },
    {
      path: 'support',
      component: () => import('@/viewss/jilu/support'),
      name: 'support',
      meta: { title: '用户比赛记录' }
  },
    {
      path: 'sponsorship',
      component: () => import('@/viewss/jilu/sponsorship11'),
      name: 'sponsorship',
      meta: { title: '用户赞助记录' }
    },
  ]
}

export default jiLuRouter