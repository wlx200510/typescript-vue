# typescript-vue

### 使用的命令说明，建议`yarn`
```
yarn install    // Project setup
yarn run serve  // Compiles and hot-reloads for development
yarn run build  // Compiles and minifies for production
yarn run lint   // Lints and fixes files
```

### vue-config的自定义属性说明

See [Configuration Reference](https://cli.vuejs.org/config/).

### 样例项目架构

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

- [TypeScript-vue-learn](https://github.com/wlx200510/TypeScript-vue-learn) --推荐
- [Vue with TypeScript](https://juejin.im/post/5bd698c7f265da0ae8015f12) --推荐
- [TypeScript+Vue实例完全教程](https://zhuanlan.zhihu.com/p/32122243) --比较老了

可以主要参考的组件：'/src/views/Home.vue'
- vue-property-decorator (@Emit/@Model还没样例)
- vuex-class (尤其要注意namespace的使用)

本质上都是语法糖。

- 需要注意的是`.d.ts`文件的编写, 方便解决常见的一个模块引用报错
- 尽量减少any的类型，学会接口定义和泛型使用
- 本仓库基于最新vue-cli3.0改造而来，可直接用于项目
- [TypeScript-vue-learn](https://github.com/wlx200510/TypeScript-vue-learn)里面的readme是一份完整文档，比较详尽

欢迎大家fork和star 一起学习 一起进步