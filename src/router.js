import Vue from 'vue'
import Router from 'vue-router'
import Studens from '@/components/Students.vue'
import Courses from '@/components/Courses.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Students',
      component: Studens
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses
    }
  ],
  mode: 'history'
})
