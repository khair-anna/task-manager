<template>
  <div
    class="flex rounded-md p-4 space-x-3"
    :class="[
      {
        'bg-green-100': intent === 'success',
        'bg-red-100': intent === 'error'
      }
    ]"
  >
    <div class="flex-1 space-y-2">
      <h2
        class="text-lg font-medium"
        :class="[
          {
            'text-green-900': intent === 'success',
            'text-red-900': intent === 'error'
          }
        ]"
      >
        {{ title }}
      </h2>
    </div>
    <div class="shrink-0">
      <button
        @click="onDismiss"
        class="p-0.5 rounded-md -m-1"
        :class="[
          {
            'hover:bg-green-200': intent === 'success',
            'hover:bg-red-200': intent === 'error'
          }
        ]"
      >
        <img src="/svg/close.svg" alt="close" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  intent: {
    type: String,
    validator(value) {
      return ['success', 'error'].includes(value)
    },
    default: 'success'
  },
  title: {
    type: String,
    required: true
  },
  onDismiss: Function
})
</script>
