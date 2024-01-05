<template>
  <transition leave-active-class="duration-500" leave-to-class="opacity-0">
    <div
      v-if="show"
      class="flex rounded-md p-4 space-x-3"
      :class="[
        {
          'bg-green-100': intent === 'success',
          'bg-red-100': intent === 'warning'
        }
      ]"
    >
      <div class="flex-1 space-y-2">
        <h2
          class="text-lg font-medium"
          :class="[
            {
              'text-green-900': intent === 'success',
              'text-red-900': intent === 'warning'
            }
          ]"
        >
          {{ title }}
        </h2>
        <span
          class="text-sm"
          :class="[
            {
              'text-green-800': intent === 'success',
              'text-red-800': intent === 'warning'
            }
          ]"
          >{{ content }}</span
        >
      </div>
      <div class="shrink-0">
        <button
          @click="onDismiss"
          class="p-0.5 rounded-md -m-1"
          :class="[
            {
              'hover:bg-green-200': intent === 'success',
              'hover:bg-red-200': intent === 'warning'
            }
          ]"
        >
          <img src="/svg/close.svg" alt="close" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </transition>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  intent: {
    type: String,
    validator(value) {
      return ['success', 'warning'].includes(value)
    },
    default: 'success'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  show: Boolean,
  onDismiss: Function
})
</script>
