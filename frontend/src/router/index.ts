import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PrivatePostsView from '@/views/PrivatePostsView.vue'
import PrivatePostView from '@/views/PrivatePostView.vue'
import PrivateNewPostView from '@/views/PrivateNewPostView.vue'
import PostView from '@/views/PostView.vue'
import SignInView from '@/views/SignInView.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import PostsView from '@/views/PostsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/signin',
      name: 'signin',
      component: () => SignInView
    },
    {
      path: '/',
      name: 'public',
      component: PublicLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => PostsView
        },
        {
          path: '/posts/:id',
          name: 'post',
          component: () => PostView
        },
      ]
    },
    
    {
      path: '/p',
      name: 'private',
      component: PrivateLayout,
      redirect: { name: 'private.posts' },
      children: [
        {
          path: '/p/posts',
          name: 'private.posts',
          component: () => PrivatePostsView
        },
        {
          path: '/p/posts/:id',
          name: 'private.post',
          component: () => PrivatePostView,
        },
        {
          path: '/p/posts/new',
          name: 'private.post.new',
          component: () => PrivateNewPostView,
        }
      ],
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next({ name: 'signin' })
        }
        
        fetch('http://localhost:3000/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            next()
          } else {
            next({ name: 'signin' })
          }
        })
        .catch(error => {
          console.error(error)
          next({ name: 'signin' })
        })
      }
    },
  ]
})

export default router
