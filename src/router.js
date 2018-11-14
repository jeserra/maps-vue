import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Map from '@/components/Map.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: HelloWorld,
    },
    {
      // route for map component
      path: '/map',
      name:"map",
      component:Map,
      props:(route)=> ({
        acronimo:route.query.acronimo
      })
    }
  ]
})
