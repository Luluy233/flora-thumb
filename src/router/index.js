import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from "@/views/HomeView"
import SearchView from "@/views/SearchView"
import IdentifylView from "@/views/IdentifyView"

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
      }
    ]

  const router = createRouter({ history: createWebHashHistory(), routes })


export default router;