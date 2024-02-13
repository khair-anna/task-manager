<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="login(loginForm)" class="flex flex-col gap-5">
      <InputUi
        type="email"
        name="email"
        :placeholder="$t('placeholders.email')"
        v-model="loginForm.email"
        :errors="v$.email.$errors"
      />
      <InputUi
        type="password"
        name="password"
        :placeholder="$t('placeholders.password')"
        v-model="loginForm.password"
        :errors="v$.password.$errors"
      />
      <ButtonUI :is-loading="isLoading">
        <span> {{ $t('buttons.logIn') }}</span>
      </ButtonUI>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textLogIn') }}</span>
      <router-link :to="{ name: 'signup' }" class="underline text-lg dark:text-zinc-300">{{
        $t('buttons.signUp')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useLogin } from '../mutations/login'
import ButtonUI from '../ui/ButtonUI.vue'
import InputUi from '../ui/InputUi.vue'
import router from '../router'
import { useAlertsStore } from '../stores/AlertsStore'

const loginForm = reactive({
  email: '',
  password: ''
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required }
  }
})

const v$ = useValidate(rules, loginForm)

const alertsStore = useAlertsStore()

const { mutateAsync, isLoading } = useLogin()

const login = async (details) => {
  const result = await v$.value.$validate()
  if (result) {
    mutateAsync(details, {
      onSuccess: () => {
        router.push('/')
        alertsStore.addNotification('success', 'You are successfully logged in')
      }
    })
  }
}
</script>
