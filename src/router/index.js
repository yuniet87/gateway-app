import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EditComponent from '../components/gateway/Edit.vue';
import CreateComponent from '../components/gateway/Create.vue';
import DevicesComponent from '../components/device/Devices.vue';
import CreateDeviceComponent from '../components/device/Create.vue';
import EditDeviceComponent from '../components/device/Edit.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: { name: 'home' } },
  { path: '/home', name: 'home', component: Home },
  { path: '/create', name: 'Create', component: CreateComponent },
  { path: '/edit/:id', name: 'Edit', component: EditComponent },
  { path: '/devices/', name: 'Devices', component: DevicesComponent },
  {
    path: '/devices/create',
    name: 'CreateDevice',
    component: CreateDeviceComponent,
  },
  {
    path: '/devices/edit/:id',
    name: 'EditDevice',
    component: EditDeviceComponent,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
