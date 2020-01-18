const Home = () => import('./home');

/* 服务路由 */
const homeRoute = [
  {
    path: '/',
    component: Home,
    name: '栗子'
  }
];

/* 状态管理 */
// const exampleStore = {
//   namespaced: true,
//   state: {},
//   mutations: {},
//   actions: {}
// };
// export { exampleRoute, exampleStore };
export { homeRoute };
