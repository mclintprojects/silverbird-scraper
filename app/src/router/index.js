import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import MovieDetail from '@/components/MovieDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/movies',
      name: 'home',
      component: Home
    },
    {
      path: '/movies/:id',
      name: 'details',
      component: MovieDetail
    },
    {
      path: '/',
      redirect: { path: '/movies' }
    }
  ],
  mode: 'history'
});
