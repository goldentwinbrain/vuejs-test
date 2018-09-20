import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      id: 0,
      title: 'One',
      complete: false
    }]
  },
  mutations: {
    addTodo (state, payload) {
      state.todos.push({
        id: ~~(Math.random() * 1000),
        title: payload,
        complete: false
      })
    },
    updateTodo (state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      state.todos.splice(index, 1, payload)
    },
    removeTodo (state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      console.log('$$$$$$', index);
      state.todos.splice(index, 1)
    }
  },
  actions: {
    addTodo ({commit}, payload) {
      commit('addTodo', payload)
    },
    updateTodo ({commit}, payload) {
      commit('updateTodo', payload)
    },
    removeTodo ({commit}, payload) {
      commit('removeTodo', payload)
    }
  }
})
