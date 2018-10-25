import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewContact from '@/components/NewContact'
import WorkFlow from '@/components/WorkFlow'
import ShowStudents from '@/components/ShowStudents'
import NewStudent from '@/components/NewStudent'
import Char from '@/components/Char'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/newcontact',
      name: 'NewContact',
      component: NewContact
    },
    {
      path: '/newstudent',
      name: 'NewStudent',
      component: NewStudent
    },
    {
      path: '/workflow',
      name: 'WorkFlow',
      component: WorkFlow
    },
    {
      path: '/showStudents',
      name: 'ShowStudents',
      component: ShowStudents
    },
    {
      path: '/char',
      name: 'Char',
      component: Char
    },

  ]
})
