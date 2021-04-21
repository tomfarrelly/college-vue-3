/**
 * @Author: tomfarrelly
 * @Date:   2021-03-02T10:21:57+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-21T04:09:53+01:00
 */



import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

import LecturersIndex from './views/lecturers/Index'
import LecturersShow from './views/lecturers/Show'
import LecturersEdit from './views/lecturers/Edit'
import LecturersCreate from './views/lecturers/Create'

import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsShow from './views/enrolments/Show'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsCreate from './views/enrolments/Create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //*****COURSES*****//
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },
    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },
    //
    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit,
      params: true
    },
    //
    //*****LECTURERS*****//
    {
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturersCreate
    },
    {
      path: '/lecturers/:id',
      name: 'lecturers_show',
      component: LecturersShow
    },
    //
    {
      path: '/lecturers/:id/edit',
      name: 'lecturers_edit',
      component: LecturersEdit,
      params: true
    },
    //*****ENROLMENTS*****//
    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentsCreate
    },
    {
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentsShow
    },
    //
    {
      path: '/enrolments/:id/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit,
      params: true
    },
  ]
});
