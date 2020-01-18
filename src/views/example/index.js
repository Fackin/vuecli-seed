const Home = () => import(/* webpackChunkName: "example" */ './home');
const ExampleList = () => import(/* webpackChunkName: "example" */ './exampleList');
const ExampleAdd = () => import(/* webpackChunkName: "example" */ './exampleAdd');
const Rock = () => import(/* webpackChunkName: "example" */ './rock');
const CardBoard = () => import(/* webpackChunkName: "example" */ './cardBoard');

/* 服务路由 */
const exampleRoute = [
  {
    path: '/example/home',
    component: Home,
    name: '栗子'
  },
  {
    path: '/example/list',
    component: ExampleList,
    name: '列表'
  },
  {
    path: '/example/add',
    component: ExampleAdd
  },
  {
    path: '/example/rock',
    component: Rock
  },
  {
    path: '/example/cardBoard',
    component: CardBoard
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
export { exampleRoute };
