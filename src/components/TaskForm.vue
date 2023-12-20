<template>
  <div class="ml-64 mt-16 px-5">
    <div class="flex justify-end mb-5">
      <button
        class="flex justify-center items-center gap-5 text-white text-xl bg-main-blue h-12 px-3 rounded-xl"
        @click="tasksStore.isCreating = !tasksStore.isCreating"
      >
        <img src="/svg/plus.svg" alt="plus" />{{ $t('buttons.addNew') }}
      </button>
    </div>
    <form
      @submit.prevent="tasksStore.createNewTask"
      class="border border-light-gray border-l-4 w-96 min-h-40 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col gap-3"
      v-if="tasksStore.isCreating"
    >
      <input
        type="text"
        :placeholder="$t('placeholders.taskName')"
        v-model="tasksStore.newTask.name"
        class="h-10 w-60 px-3 rounded-lg dark:bg-zinc-700"
        required
      />
      <textarea
        :placeholder="$t('placeholders.taskDescription')"
        v-model="tasksStore.newTask.description"
        class="h-14 w-60 px-3 rounded-lg dark:bg-zinc-700"
        required
      ></textarea>
      <VueDatePicker
        v-model="tasksStore.newTask.endDate"
        input-class-name="dark:bg-zinc-700 dark:text-white"
        :placeholder="$t('placeholders.taskEndDate')"
        text-input
      />
      <div class="flex gap-9">
        <button type="submit" class="bg-main-blue px-2 h-10 rounded-lg text-white">
          {{ $t('buttons.add') }}
        </button>
        <button
          class="bg-main-blue px-2 h-10 rounded-lg text-white"
          @click="tasksStore.isCreating = !tasksStore.isCreating"
        >
          {{ $t('buttons.cancel') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useTasksStore } from '../stores/TasksStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const tasksStore = useTasksStore()
</script>
