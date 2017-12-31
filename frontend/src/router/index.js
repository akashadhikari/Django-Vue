import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import CreateLead from '@/components/lead/CreateLead'
import lead from '@/components/lead/lead'
import communication from '@/components/communication/communication'
import CreateCommunication from '@/components/communication/CreateCommunication'
import LogIn from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/create-lead',
      name: 'CreateLead',
      component: CreateLead
    },
    {
      path: '/communications',
      name: 'communication',
      component: communication
    },
    {
      path: '/create-communication',
      name: 'CreateCommunication',
      component: CreateCommunication
    },
    {
      path: '/leads',
      name: 'lead',
      component: lead
    },
    {
      path: '/login',
      name: 'Login',
      component: LogIn
    }
  ],
  mode: 'history'
})
