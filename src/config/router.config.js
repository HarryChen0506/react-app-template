// import HeaderLayout from '@src/layouts/HeaderLayout'
// import ViewportLayout from '@src/layouts/ViewportLayout'
// import Login from '@pages/Login'
// import Viewer from '@pages/Viewer'
// import StudyList from '@pages/StudyList'
// import ReportTemplateManage from '@pages/ReportTemplateManage'
// import Guide from '@pages/Guide'
// import Demo from '@pages/Demo' // TODO: remove

// export const ADMIN_ROUTE = {
//   LOGIN: '/admin/login',
//   ACCOUNT: '/admin/account',
//   SEARCH: '/admin/search',
//   UM: '/admin/um',
//   ORG: '/admin/um/department/:id',
//   ADD_USER: '/admin/um/adduser',
//   USER: '/admin/um/user/:userId',
// }

// export const PRODUCT_ROUTE = {
//   LOGIN: '/login',
//   DASHBOARD: '/dashboard',
//   STUDY_LIST: '/studyList',
//   VIEWER: '/view/:studyId',
//   TEMPLATE_MANAGE: '/templateManage',
//   GUIDE: '/guide'
// }

// const routerConfig = [
//   {
//     path: '/',
//     exact: true,
//     redirect: '/dashboard',
//   },
//   {
//     path: '/login',
//     component: Login,
//     exact: true
//   },
//   {
//     path: '/view',
//     component: ViewportLayout,
//     routes: [
//       { path: '/view/:studyId', name: 'viewer', exact: true, component: Viewer },
//     ]
//   },
//   {
//     path: '/',
//     component: HeaderLayout,
//     routes: [
//       { path: '/dashboard', name: 'dashboard', exact: true, component: Dashboard },
//       { path: '/studyList', name: 'studyList', exact: true, component: StudyList },
//       { path: '/templateManage', name: 'templateManage', exact: true, component: ReportTemplateManage },
//       { path: '/guide', name: 'guide', exact: true, component: Guide },
//     ]
//   }
// ]

// import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'

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
