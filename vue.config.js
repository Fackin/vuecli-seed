// vue.config.js
require('./schema.config');
module.exports = {
  publicPath: '/vuecli-seed/',

  outputDir: './dist',

  assetsDir: '', // 放置生成的静态资源的（相对于outputDir）目录

  /**
   * Type: string
   * Default: 'index.html'
   * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
   */
  indexPath: 'index.html',

  /**
   * Type: boolean
   * Default: true
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   * 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
   * 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
   */
  filenameHashing: true,

  /**
   * Type: Object
   * Default: undefined
   * 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
   * 其值应该是一个对象，对象的 key 是入口的名字，value 是：
   * 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
   * 或一个指定其 entry 的字符串。
   * */
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/index/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: 'src/subpage/main.js'
  // }
  /**
   * Type: boolean | 'error'
   * Default: true
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
   * 这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   */

  lintOnSave: process.env.NODE_ENV !== 'production',
  /**
   * Type: boolean
   * Default: false
   * 是否使用包含运行时编译器的 Vue 构建版本。
   */
  runtimeCompiler: false,
  /**
   * Type: Array<string | RegExp>
   * Default: []
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
   * 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  transpileDependencies: [],
  /**
   * Type: boolean
   * Default: true
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   */
  productionSourceMap: false,
  /**
   * Type: string
   * Default: undefined
   * 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
   * 需要注意的是该选项仅影响由 html-webpack-plugin
   * 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   */
  // crossorigin: '',

  /**
   * Type: boolean
   * Default: false
   * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
   * 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
   * 需要注意的是该选项仅影响由 html-webpack-plugin
   * 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   * 另外，当启用 SRI 时，preload resource hints 会被禁用，
   * 因为 Chrome 的一个 bug 会导致文件被下载两次。
   */
  // integrity: false,

  /**
   * configureWebpack
   * Type: Object | Function
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   */
  // configureWebpack: {
  //   plugins: [
  //     new MyAwesomeWebpackPlugin()
  //   ]
  // }
  /**
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。
   * 该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   * */
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // }
  chainWebpack(config) {
    // 开发环境hash 线上chunkhash
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name]_[hash].js').end(); //js打包加hash
    } else {
      config.output.filename('[name]_[chunkhash].js').end(); //js打包加hash
    }
  },

  /**
   * chainWebpack
   * Type: Function
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
   * 允许对内部的 webpack 配置进行更细粒度的修改。
   */
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //       .loader('vue-loader')
  //       .tap(options => {
  //         // 修改它的选项...
  //         return options
  //       })
  // }

  /**
   *
   * devServer.proxy
   * Type: string | Object
   * 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
   * 你需要在开发环境下将 API 请求代理到 API 服务器。
   * 这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
   */
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7002',
        ws: true,
        changOrigin: true,
        pathRequiresRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
