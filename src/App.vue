<template lang='pug'>
  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5
      template(v-for='(todo, i) in todoList')
        div.pa2.flex.justify-between.items-center.br3.shadow-3.mb1.relative(@click="onUpdateTodo(todo)")
          div.flex.items-center
            input(type="checkbox" :id="'todo' + i" :checked="todo.complete")
            label.ml2(:for="'todo' + i") {{todo.title}}
          span.z-1(@click.stop="onArchiveTodo(todo)") x
          div.absolute.absolute--fill.todo-complete.br3.flex.items-center.justify-center(v-if="todo.complete === true")
            div.w-70.complete--stroke
      div
        input.w-100(type="text" placeholder="New Todo" v-model="title" @keyup.enter="onAddTodo()")
        //- TODO:
    template(v-if="todos.filter((todo) => todo.status === 'archived').length")
      h1.tc.f5.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        template(v-for='(todo, i) in archivedList')
          div.pa2.flex.justify-between.items-center.br3.shadow-3.relative.mb1(@click="onUpdateTodo(todo)")
            div.flex.items-center
              input(type="checkbox" :id="'todo' + i" :checked="todo.complete")
              label.ml2(:for="'todo' + i") {{todo.title}}
            span.z-1(@click.stop="onArchiveTodo(todo)") x
            div.absolute.absolute--fill.todo-complete.br3.flex.items-center.justify-center(v-if="todo.complete === true")
              div.w-70.complete--stroke
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  components: {},
  data: () => ({
    title: '',
  }),
  computed: {
    ...mapState(['todos']),
    todoList () {
      return this.todos.filter(todo => todo.status !== 'archived')
    },
    archivedList () {
      return this.todos.filter(todo => todo.status === 'archived')
    }
  },
  methods: {
    ...mapActions(['addTodo', 'updateTodo', 'removeTodo']),
    onAddTodo () {
      this.addTodo(this.title)
      this.title = ''
    },
    onUpdateTodo (todo) {
      todo.complete = !todo.complete
      this.updateTodo(todo)
    },
    onArchiveTodo (todo) {
      if (todo.status === 'archived') {
        this.removeTodo(todo)
      } else {
        todo.status = 'archived'
        this.updateTodo(todo)
      }
    }
  }
}
</script>
<style lang="stylus">
  .todo-complete
    background: rgba(0, 0, 0, 0.2);
  .complete--stroke
    background: #333;
    height: 2px;
</style>