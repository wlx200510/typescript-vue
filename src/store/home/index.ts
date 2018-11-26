/*
 * @Author: wanglixing
 * @Date: 2018-11-26 15:34:20
 * @Last Modified by: wanglixing
 * @Last Modified time: 2018-11-26 15:47:07
 */
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
