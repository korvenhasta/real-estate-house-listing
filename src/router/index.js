import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../views/Houses/IndexPage.vue'

export const HOME_PAGE = 'home'
export const CREATE_PAGE = 'create'
export const DETAIL_PAGE = 'details'
export const EDIT_PAGE = 'edit'
export const ABOUT_PAGE = 'about'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/properties'
    },

    {
      path: '/properties',
      component: IndexPage,
      children: [
        {
          path: '',
          name: HOME_PAGE,
          component: () => import('../views/Houses/SearchPage.vue')
        },
        {
          path: 'create',
          name: CREATE_PAGE,
          component: () => import('../views/Houses/CreatePage.vue')
        },
        {
          path: ':id',
          name: DETAIL_PAGE,
          component: () => import('../views/Houses/DetailPage.vue')
        },
        {
          path: ':id/edit',
          name: EDIT_PAGE,
          component: () => import('../views/Houses/EditPage.vue')
        }
      ]
    },

    {
      path: '/about',
      name: ABOUT_PAGE,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
