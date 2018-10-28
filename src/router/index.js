import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewContact from '@/components/NewContact'
import WorkFlow from '@/components/WorkFlow'
import ShowStudents from '@/components/ShowStudents'
import NewStudent from '@/components/NewStudent'
import Char from '@/components/Char'
import Learning from '@/components/Learning'
import BarChart from '@/components/BarChart'
import EditStudent from '@/components/EditStudent'
import ShowLinuxStudy from '@/components/ShowLinuxStudy'
import NewCustomer from '@/components/NewCustomer'
import ShowCustomer from '@/components/ShowCustomer'
import EditCustomer from '@/components/EditCustomer'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BarChart',
      component: BarChart
    },
    {
      path: '/newcontact',
      name: 'NewContact',
      component: NewContact
    },
    {
      path: '/newstudent',
      name: '录入信息',
      component: NewStudent
    },
    {
      path: '/workflow',
      name: 'WorkFlow',
      component: WorkFlow
    },
    {
      path: '/showStudents',
      name: '查看学生信息',
      component: ShowStudents
    },
    {
      path: '/editStudent/:id',
      name: 'editStudent',
      alia: '编辑学生信息',
      component: EditStudent
    },
    {
      path: '/chart',
      name: '报表1',
      component: Char
    },
    {
      path: '/barchart',
      name: '报表2',
      component: BarChart
    },
    {
      path: '/learning',
      name: '每日学习',
      component: Learning
    },
    {
      path: '/linux',
      name: 'Linux指令学习',
      component: ShowLinuxStudy
    },
    {
      path: '/customer/new',
      name: '新增客户信息',
      component: NewCustomer
    },
    {
      path: '/customer/list',
      name: '查看客户信息',
      component: ShowCustomer
    },
    {
      path: '/customer/update/:id',
      name: '修改客户信息',
      component: EditCustomer
    },

  ]
})
