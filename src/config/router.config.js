// import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'

export const ROUTE = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  // USER: '/user/:userId',
}

const routerConfig = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/',
    component: BasicLayout,
    authority: [], // 'admin', 'user'
    routes: [
      { path: '/dashboard', name: 'dashboard', exact: true, authority: ['admin', 'user'], component: Dashboard },
    ]
  },
]

export default routerConfig
