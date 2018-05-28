import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/movies',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      redirect: { path: '/movies' }
    }
  ],
  mode: 'history'
});
