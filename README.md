# typescript-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### custom structure

```shell
├── public                          // 静态页面
├── scripts                         // 相关脚本配置
├── src                             // 主目录
    ├── assets                      // 静态资源
    ├── filters                     // 过滤
    ├── lib                         // 全局插件
    ├── router                      // 路由配置
    ├── store                       // vuex 配置
    ├── styles                      // 样式
    ├── types                       // 全局注入
    ├── utils                       // 工具方法(axios封装，全局方法等)
    ├── views                       // 页面
    ├── App.vue                     // 页面主入口
    ├── main.ts                     // 脚本主入口
    ├── registerServiceWorker.ts    // PWA 配置
├── .editorconfig                   // 编辑相关配置
├── .npmrc                          // npm 源配置
├── .postcss.config.js              // postcss 配置
├── babel.config.js                 // preset 记录
├── package.json                    // 依赖
├── README.md                       // 项目 readme
├── tsconfig.json                   // ts 配置
├── tslint.json                     // tslint 配置
└── vue.config.js                   // webpack 配置
```

三个帮助采坑的教程链接：

- [Vue with TypeScript](https://juejin.im/post/5bd698c7f265da0ae8015f12)
- [TypeScript+Vue实例完全教程](https://zhuanlan.zhihu.com/p/32122243) --比较老了
- [TypeScript-vue-learn](https://github.com/wlx200510/TypeScript-vue-learn)

可以主要参考的组件：'/src/views/Home.vue'
- vue-property-decorator (@Emit/@Model还没样例)
- vuex-class (尤其要注意namespace的使用)

本质上都是语法糖。
欢迎大家fork和star 一起学习 一起进步