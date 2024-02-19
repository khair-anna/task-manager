<template>
  <div class="mt-16 px-5">
    <div class="flex justify-end mb-5">
      <button
        class="flex justify-center items-center gap-5 text-white text-xl bg-main-blue h-12 px-3 rounded-xl"
        @click="isCreating = !isCreating"
      >
        <img src="/svg/plus.svg" alt="plus" />{{ $t('buttons.addNew') }}
      </button>
    </div>
    <form
      @submit.prevent="createNewTask"
      class="border border-light-gray border-l-4 sm:w-96 min-h-40 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col gap-3"
      v-if="isCreating"
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
        required
      />
      <div class="flex gap-9">
        <ButtonUI
          :is-loading="isLoading"
          class="items-center h-10 text-white border-0 mx-0 text-base py-0 dark:text-white"
        >
          {{ $t('buttons.add') }}
        </ButtonUI>
        <button
          class="bg-main-blue px-2 h-10 rounded-lg text-white"
          @click="isCreating = !isCreating"
        >
          {{ $t('buttons.cancel') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ButtonUI from '../ui/ButtonUI.vue'

import { useTasksStore } from '../stores/TasksStore'
import { useAlertsStore } from '../stores/AlertsStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useCreateNewTask } from '../mutations/createNewTask'

const tasksStore = useTasksStore()
const alertsStore = useAlertsStore()
const isCreating = ref(false)

const { mutateAsync, isLoading, data } = useCreateNewTask()

const createNewTask = () => {
  mutateAsync(data, {
    onSuccess: () => {
      alertsStore.addNotification('success', 'Task was successfully created')
      tasksStore.newTask.name = ''
      tasksStore.newTask.description = ''
      tasksStore.newTask.endDate = ''
    }
  })
  isCreating.value = false
}
</script>
