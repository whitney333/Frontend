import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import TrendingArtistsView from '@/views/TrendingArtistsView.vue'
import ArtistView from '@/views/ArtistView.vue'
import SNS_InstaView from '@/views/SNS_InstaView.vue'
import SNS_TiktokView from '@/views/SNS_TiktokView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/sns',
      name: 'Sns',
      children: [
        
        {
          path: 'instagram',
          name: 'Instagram',
          component: SNS_InstaView
        },
        {
        path: 'youtube',
        name: 'Youtube',
        component: AboutView,
        },
        {
          path: 'tiktok',
          name: 'TikTok',
          component: SNS_TiktokView,
        },  
        {
          path: 'bilibili',
          name: 'Bilibili',
          component: AboutView,
          meta: {
            requireAuth: true,
            keepAlive: true
          }
        }
      ]

    },
    {
      path: '/works',
      name: 'Works',
      children: [
        {
          path: 'music',
          name: 'Music',
          component: AboutView,
          meta: {
            requireAuth: true,
            keepAlive: true
          }
        },
      ]
    },
    {
      path: '/campaign',
      name: 'Campaign',
      children: [
        {
          path: 'analytics',
          name: 'Campaign Analytics',
          component: AboutView,
        },
      ]
    },
    {
      path: '/trending-artists',
      name: 'Trending Artists',
      component: TrendingArtistsView,
    },
    {
      path: '/artist/:artistId/:artistName',
      name: 'Artist',
      component: ArtistView
    }
  ]
})

export default router
