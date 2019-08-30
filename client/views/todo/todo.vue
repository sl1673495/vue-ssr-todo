<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs
        :value="filter"
        @change="handleChangeTab"
      >
        <tab
          :index="tab"
          :key="tab"
          :label="tab"
          v-for="tab in states"
        ></tab>
      </tabs>
    </div>
    <input
      @keyup.enter="onAddTodo"
      autofocus="autofocus"
      class="add-input"
      placeholder="接下去要做什么？"
      type="text"
    />
    <item
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
      @toggle="toggleTodoState"
      v-for="todo in filteredTodos"
    />
    <helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  data () {
    return {
      filter: 'all',
      states: ['all', 'active', 'completed']
    }
  },
  mounted () {
    this.fetchTodos()
  },
  components: {
    Item,
    Helper
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'deleteAllCompleted',
      'updateTodo'
    ]),
    async onAddTodo (e) {
      const value = e.target.value.trim()
      if (!value) {
        return this.$notify('请输入内容！')
      }
      e.target.value = ''
      await this.addTodo({
        content: value,
        completed: false
      })
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 100%;
  height: 100%;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.tab-container {
  padding: 0 10px;
  background: #fff;
}
</style>


