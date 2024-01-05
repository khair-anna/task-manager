<template>
  <div>
    <LayoutDefault>
      <!-- <SearchForm /> -->
      <SearchTasks
        :startSearch="startSearch"
        :closeSearch="closeSearch"
        :isSearching="isSearching"
      />
      <div v-if="!isSearching">
        <TaskForm />
        <Suspense>
          <TasksAll />
          <template #fallback>
            <TasksAllSceleton />
          </template>
        </Suspense>
      </div>
    </LayoutDefault>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LayoutDefault from '../components/LayoutDefault.vue'
import TaskForm from '../components/TaskForm.vue'
import TasksAll from '../components/TasksAll.vue'
import TasksAllSceleton from '../components/sceleton/TasksAllSceleton.vue'
// import SearchForm from '../components/SearchForm.vue'
import SearchTasks from '../components/SearchTasks.vue'

const isSearching = ref(false)

const startSearch = () => {
  isSearching.value = true
}

const closeSearch = () => {
  isSearching.value = false
}
</script>
