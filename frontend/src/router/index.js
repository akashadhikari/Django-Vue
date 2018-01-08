import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'

import communication from '@/components/Communication/communication'
import Createcom1 from '@/components/Communication/CreateCom/Createcom1'
import Createcom2 from '@/components/Communication/CreateCom/Createcom2'
import Createcom3 from '@/components/Communication/CreateCom/Createcom3'
import Createcom4 from '@/components/Communication/CreateCom/Createcom4'
import CreateCommunication from '@/components/Communication/CreateCommunication'
import EditCommunication from '@/components/Communication/EditCommunication'

import lead from '@/components/Lead/lead'
import CreateLead from '@/components/Lead/CreateLead'
import EditLead from '@/components/Lead/EditLead'

// import SignUp from '@/components/Users/SignUp'
import LogIn from '@/components/Login'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/communication',
      name: 'Communication',
      component: communication,
      beforeEnter: AuthGuard
    },
    {
      path: '/createCommunication',
      name: 'CreateCommunication',
      component: CreateCommunication,
      beforeEnter: AuthGuard
    },
    {
      path: '/createcom1',
      name: 'Createcom1',
      component: Createcom1,
      beforeEnter: AuthGuard
    },
    {
      path: '/createcom2',
      name: 'Createcom2',
      component: Createcom2,
      beforeEnter: AuthGuard
    },
    {
      path: '/createcom3',
      name: 'Createcom3',
      component: Createcom3,
      beforeEnter: AuthGuard
    },
    {
      path: '/createcom4',
      name: 'Createcom4',
      component: Createcom4,
      beforeEnter: AuthGuard
    },
    {
      path: '/editcommunication',
      name: 'EditCommunication',
      component: EditCommunication,
      beforeEnter: AuthGuard
    },
    {
      path: '/lead',
      name: 'Lead',
      component: lead,
      beforeEnter: AuthGuard
    },
    {
      path: '/createlead',
      name: 'CreateLead',
      component: CreateLead
    },
    {
      path: '/editlead',
      name: 'EditLead',
      component: EditLead,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: LogIn
    }
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: SignUp
    // }
  ],
  mode: 'history'
})
