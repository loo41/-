import Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/views/index.vue')), 'index')
const Login = r => require.ensure([], () => r(require('@/views/login.vue')), 'login')
const Home = r => require.ensure([], () => r(require('@/views/home.vue')), 'home')
const Pedestal = r => require.ensure([], () => r(require('@/views/pedestal.vue')), 'pedestal')
const Record = r => require.ensure([], () => r(require('@/views/record.vue')), 'record')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'pedestal',
          name: 'Pedestal',
          component: Pedestal
        },
        {
          path: 'record',
          name: 'Record',
          component: Record
        }
      ]
    }
  ]
})
