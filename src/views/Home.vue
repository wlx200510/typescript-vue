<template>
  <div class="home">
    <p>{{ count }}</p>
    <button @click="INCREMENT(1)">增加</button>
    <button @click="DECREMENT(1)">减少</button>
    <div class="weather-wrapper">
      <input v-model="city" placeholder="请输入城市" />
      <button @click="getCityWeather(city)">获取天气</button>
      <p>今日天气：{{message}}</p>
      <p>最高温度：{{content.high}}</p>
      <p>最底温度：{{lowTemperature}}</p>
    </div>
  </div>
</template>

<script lang="ts">
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
</script>

<style lang="less" scoped>
  .home {
    font-size: 16px;
    line-height: 1.2;
    .weather-wrapper{
      margin-top: 30px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>
