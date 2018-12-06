# typescript-vue

使用的命令说明，建议`yarn`

```
yarn install    // Project setup
yarn run serve  // Compiles and hot-reloads for development
yarn run build  // Compiles and minifies for production
yarn run lint   // Lints and fixes files
```

vue-config的自定义属性说明 See [Configuration Reference](https://cli.vuejs.org/config/).


发现网上很多ts+vue的脚手架介绍的文章虽然多，但往往有所缺憾，经常让新人没法进行下去，经过总结，在我的`github`仓库中探索了一份脚手架，具体地址为：[typescript-vue](https://github.com/wlx200510/typescript-vue) 有个示例的组件和接口配置，也是参考各家大佬资料来完成的，下面就跟着笔者一起来探索脚手架的搭建过程和一些当下的最佳实践的代码写法。`go~go~go`
<!-- more -->

### 项目之初

在`vue-cli 3.0`上，已经有了对ts语言的全面支持，终于不用对着`webpack.config.js`根据`ts-loader`说明一堆魔改了，站在巨人的肩膀上才是王道。所以第一步就是在电脑上安装`vue-cli 3.0`，为搭建起`ts-vue`框架做好保障工作。

安装方法：
```shell
npm install @vue/cli -g
# or
yarn global add @vue/cli

vue --version
```

安装没啥好说的，就是记得不要装成2.x版本了，具体看参考[这里](https://cli.vuejs.org/guide/installation.html)，注意文档中对`node`版本的要求，如果不满足需要提前升级哦。

创建基本`ts-vue`框架(可以用GUI，不过个人习惯CLI):

```shell
# 选择自己手动配置
? Please pick a preset: Manually select features
# 选择本项目需要的预处理器和工具
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter
# 选择是否要用类继承方式的组件写作风格
? Use class-style component syntax? Yes
# babel和ts一起用
? Use Babel alongside TypeScript for auto-detected polyfills? Yes
# 选择css的预处理器，这里笔者选了Less
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): LESS
# 选择代码格式检查器 选TSLint
? Pick a linter / formatter config: TSLint
# 选择在commit代码时修复代码格式，保存时检查格式
? Pick additional lint features: Lint on save, lint and fix on commit
# 选择把各个工具的配置列为单独文件放到项目目录下 方便维护
? Where do you profer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
# 不需要把内容保存为一个模板
? Save this as a preset for future projects? No
# 选用安装这些包的工具，可选npm和yarn
? Pickthe package manager to use when installing dependecies: YARN
```

然后就是等待安装了，经过漫长的时间之后，顺利的话就完成了初步的脚手架搭建。此时的项目目录如下：

```shell
├── public                          // 静态页面
├── src                             // 主目录
    ├── assets                      // 静态资源
    ├── components                  // 组件
    ├── views                       // 页面
    ├── App.vue                     // 页面主入口
    ├── main.ts                     // 脚本主入口
    ├── registerServiceWorker.ts    // PWA 配置
    ├── router.ts                   // 路由
    ├── shims-tsx.d.ts              // 相关 tsx 模块注入
    ├── shims-vue.d.ts              // Vue 模块注入
    └── store.ts                    // vuex 配置
├── .postcssrc.js                   // postcss 配置
├── package.json                    // 依赖
├── tsconfig.json                   // ts 配置
└── tslint.json                     // tslint 配置
```

### 结构改造

为了更好地满足业务开发的要求，参考某位大佬的分享做了结构改造，完成后的结构如下所示：

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
上面的项目结构把各个模块拆分的比较细致，便于项目的迭代和维护，同时方便了分模块开发的需求，通过`views`文件夹维护各自的页面逻辑，公共的方法和路由配置都交给单独的文件夹模块来负责，相信有经验的小伙伴都懂的~

在介绍具体改造之前，先介绍几个概念，主要是针对某些对ts不熟悉的小伙伴的：

- 把项目所有的`.d.ts`文件放到了types文件夹中统一维护，那这种`.d.ts`文件是干啥的呢
- 怎样让`ts`识别到`.vue`后缀的组件呢？用纯js来编写组件是不受这个限制的，但直接用单文件组件是需要配置点东西的

其实上面两个问题本质是同一个问题，就我自己的理解，`.d.ts`文件是用于告诉`typescript`什么文件可用ts来解析或者某些引入的模块的接口结构，为了方便大家理解，项目中有配置`ajax.d.ts`和`shims-qs.d.ts`两个文件作为示例。
`shims-vue.d.ts`这个文件，主要用于`TypeScript`识别`.vue`文件，`Ts`默认并不支持导入`vue`文件，这个文件告诉`ts`导入`.vue`文件都按`VueConstructor<Vue>`处理，因此导入`vue`文件必须写`.vue`后缀。这个文件是脚手架搭建好后自带的，所以不需要我们自己来写。
`shims-tsx.d.ts`文件，这个文件主要是方便你使用在`ts`中使用`jsx`语法，前提是需要用`vue render function`从而在渲染函数中使用`jsx`来用上`t`s的静态类型提示。
`ajax.d.ts`文件用于接口请求返回的`res`的接口格式，写在这个文件中就定义到了全局，可以直接通过`(res: Ajax.AjaxResponse)`这样来使用，可参照后面的`Home.vue`中请求数据的写法，相信会理解不少。
理论上在ts中通过`import`引入的模块都要指定其数据结构，否则ts-lint就会报错，好在大部分常用模块都有@types的编写，这个具体介绍放在下面，现在只需对`.d.ts`有个概念上的认识即可，让我们继续。


路由管理：在`router/index.ts`中配置了路由懒加载的配置，但这一块跟普通js相比没啥区别，具体可参考相关文件的写法，不做重点介绍

vuex的模块化管理：这个牵扯到`vuex`在`typescript`的加成下，如何更好地应用于项目，因此要展开说一波。
store的示例结构如下所示：
```shell
├── home                            // 主目录
    ├── index.ts                    // vuex state getters mutations action 管理
    ├── interface.ts                // 接口管理
└── index.ts                        // vuex 主入口
```
`store`下面一个文件夹对应一个模块，每一个模块都有一个`interface`进行接口管理，这也是规范化模块的样板。需要注意的一点是：之前模块化是不需要`interface.ts`这个文件的，这个新增接口声明文件的作用是指定当前模块中的`State`接口类型，从而明确该模块的`State`中有哪些变量，可以从这个文件里面揣摩下ts中类型接口定义的写法和组织技巧。
```ts
export interface HomeContent {
  name: string,
  m1?: boolean
}
export interface State {
  count: number,
  message: string,
  test1?: HomeContent[]
  // test1?: Array<HomeContent>
}
```
然后可以在`home/index.ts`下写相应的模块内容：
```js
import request from '@/utils/api'
import { State } from './interface'
import { Commit } from 'vuex'

// 请求的data需要定义一个接口来约束
interface GetTodayWeatherParam {
  city: string
}

const state: State = {
  count: 0,
  message: '',
  test1: [],
}

const getters = {
  count: (state: State) => state.count,
  message: (state: State) => state.message,
}

const mutations = {
  INCREMENT(state: State, num: number) {
    state.count += num
  },
  DECREMENT(state: State, num: number) {
    state.count -= num
  },
  MESSAGE(state: State, payload: any) {
    state.message = payload.message
  },
}

const actions = {
  // request.get可以理解为返回了一个promise,具体封装可参考仓库中的api.ts文件
  getTodayWeather(context: { commit: Commit }, params: GetTodayWeatherParam) {
    return request.get('/weather_mini', { params })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
```
以上模块比较完整的表示了在`typeScript`中`state|getters|mutations|actions`的写法，抛砖引玉，请多指教。
接下来我会用`home.vue`这个文件来完整介绍一下使用`typescript`如何优雅地写`Vue`组件，这也是最核心的内容。

### Vue组件的TS写法探索

> 经过各种资料翻阅，得知需要使用如下两个插件`vue-property-decorator`和`vuex-class`来辅助编写Vue组件

先介绍对外暴露Vue组件的写法，通常一种是`Vue.extend()`，另一种是`@Components` + `class XXX extends Vue`，关于这两者的比较，推荐[文章](https://juejin.im/post/5bd698c7f265da0ae8015f12)，虽然函数式组件只能用前者，但论优雅程度和方便程度，我还是推崇后者，具体问题具体分析，这两种组件又不是不能混用，具体看各人喜好，下面的讲解都是基于`vue-property-decorator`来介绍的。

#### vue-property-decorator的用法
[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 完全依赖于官方库 [vue-class-component](https://github.com/vuejs/vue-class-component)，不用担心维护问题，可以放心大胆使用。其中包含了 8 个装饰符解决写的问题。
- `@Emit`		        指定事件 emit，可以使用此修饰符，也可以直接使用 `this.$emit()`
- `@Inject`         指定依赖注入
- `@Mixins`         mixin 注入 
- `@Model`          指定 model(少)
- `@Prop`           指定 Prop
- `@Provide`        指定 Provide(少)
- `@Watch`          指定 Watch
- `@Component`      组件修饰符

上一个带`mixin`和外部组件的用法的例子：
`fooMixin.ts`:
```typescript
import { Vue, Component } from 'vue-property-decorator'
@component
export default class FooMixin extends Vue {
  mixinValue = 'Hello'
}
```
组件的写法例子：
```typescript
import { Vue, Component, mixins, Prop, Watch } from 'vue-property-decorator'
import FooMixin from './fooMixin'
import Hello from './Hello.vue'

interface Person {
  name: string,
  age: number
}

@Component({
  componsnts: {
    Hello
  }
})
export class MyComp extends mixins(FooMixin) { // 可传入多个mixin
  @Prop({ default: 0 })
  propA: number

  @Watch('foo')
  onChildChanged (val: string, oldVal: string) {}
  @Watch('bar', { immediate: true, deep: true })
  onPersonChanged (val: Person, oldVal: Person) {}

  created () {
    console.log(this.mixinValue) // -> Hello
  },
   // dynamic component this.$refs.helloComponent.sayHello()
  $refs!: {
    helloComponent: Hello
  }
}
```
#### vuex-class的用法

提供了 4 个修饰符和方便模块索引的`namespace`，解决`Vuex`的使用问题
- @State
- @Getter
- @Mutation
- @Action
- namespace

官方仓库的使用例子如下，可观摩学习：
```typescript
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const someModule = namespace('path/to/module')

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  // If the argument is omitted, use the property name
  // for each state/getter/action/mutation type
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```
在上整体的例子之前有几个注意点要提前说明：

- 使用了ts后，接口层面很多数据结构都可以预先定义出来，能不用any就不用，方便排错
- 初次使用，可能会报一堆`lint`的错误，可以好好研究下`ts-config`和`ts-lint`，通过配置解决细节问题
- `$refs`的报错问题，需要用到类型断言，来使用其上的dom方法，这个下面会提到，不要急
- 定义`props`的变量类型时，要用感叹号表示非空断言，否则报错让人抓狂。

`home.vue`这个组件的具体写法如下所示：
```typescript
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'

const homeModule = namespace('home')
interface WeatherContent {
  low: string,
  high: string,
  type: string
}

@Component
export default class Home extends Vue {
  // 原data中的属性可以直接写
  public city: string = '邯郸'
  public content: WeatherContent = {
    low: '',
    high: '',
    type: '',
  }

  @Prop({ default: 0 })
  public propA!: number

  @homeModule.State('message') public message!: string
  @homeModule.Getter('count') public count!: number
  @homeModule.Mutation('INCREMENT') public INCREMENT!: (num: number) => void
  @homeModule.Mutation('DECREMENT') public DECREMENT!: (num: number) => void
  @homeModule.Mutation('MESSAGE') public MESSAGE!: (data: {message: string}) => void
  @homeModule.Action('getTodayWeather') public getTodayWeather!: (payload: {city: string}) => Promise<Ajax.AjaxResponse>

  @Watch('content', { immediate: true, deep: true })
  public onPersonChanged(val: WeatherContent): void {
    console.log(val)
    this.INCREMENT(1)
  }
  // 代替computed的写法
  get lowTemperature(): string {
    return this.content.low
  }

  public created() {
    console.log(this.message) // -> store.home.state.message
    console.log(this.count)   // -> store.home.getters.count
    this.INCREMENT(2) // -> store.commit('home/INCREMENT', 2)
    this.getCityWeather(this.city)
  }

  // 方法可以直接定义，不需要用methods包裹起来
  public getCityWeather(city: string): void {
    this.getTodayWeather({ city }).then((res: Ajax.AjaxResponse) => { // -> store.dispatch('home/foo', { city: city })
      const { low, high, type } = res.data.forecast[0]
      this.MESSAGE({ message: type })
      this.content = { low, high, type }
    })
  }
}
```

#### 解决$refs的报错

$refs 报错这个问题相信基本都遇到，除非你真没用到这个，如图：

![](build-ts-vue/refs.png)

- 第一种解决方案：
把这个变量改成定义成HTMLInputElement就好，这里需要用到类型断言
```javascript
test() {
  let inputBox: HTMLInputElement = this.$refs.inputBox as HTMLInputElement
  inputBox.blur()
}
```
- 第二种解决方案(刚才上面代码示例有提到): `$refs!: {}`

![](build-ts-vue/refs2.png)

这样编辑器还会提示组件里面有什么方法，当你打出`this.$refs.header.`时候，编辑器有提示`Header`这个组件里面的属性和方法

### 建议的组件写作顺序

> 参考工作组内的最佳实践，给出建议如下

组件引用，mixins，filters 等放在`@Component`里面，放在首行，装饰器一定要放在顶部。
`class`内部的顺序：

- data

- @Prop

- @State

- @Getter

- @Action

- @Mutation

- @Watch

- 生命周期钩子

  - beforeCreate（按照生命周期钩子从上到下）

  - created

  - beforeMount

  - mounted

  - beforeUpdate

  - updated

  - activated

  - deactivated

  - beforeDestroy

  - destroyed

  - errorCaptured（最后一个生命周期钩子，这个用的较少）

- 路由钩子

  - beforeRouteEnter

  - beforeRouteUpdate

  - beforeRouteLeave

- computed

- methods

### 总结
一开始学习了微软在VUE项目中引入TS的过程，参考了[TypeScript Vue Starter](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter)，建立了初步概念，在学习了相关TypeScript理念和一些常用实践后探究了大型Vue项目引入TypeScript的姿势。希望能给大家一些技巧和想法，最后再推荐一下按照本教程建立好的[仓库](https://github.com/wlx200510/typescript-vue)，欢迎star&fork。

Reference：
- [合格前端第十二弹-TypeScript + 大型项目实战](https://zhuanlan.zhihu.com/p/40322215)
- [Vue with TypeScript](https://juejin.im/post/5bd698c7f265da0ae8015f12)
- [TypeScript+Vue实例完全教程](https://zhuanlan.zhihu.com/p/32122243)