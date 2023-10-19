import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from "@/views/HomeView"
import SearchView from "@/views/SearchView"
import IdentifylView from "@/views/IdentifyView"
import DetailView from "@/views/DetailView"

  const routes =
    [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/search',
        name: 'search',
        component: SearchView,
      },
      {
        path: '/identify',
        name: 'identify',
        component: IdentifylView,
      },
      {
        path:'/detail',
        name:'detail',
        component: DetailView,
      }
    ]

  const router = createRouter({ history: createWebHashHistory(), routes })


export default router;