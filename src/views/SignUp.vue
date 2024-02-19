<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="signup(signupForm)" class="flex flex-col gap-5">
      <InputUi
        type="text"
        name="name"
        :placeholder="$t('placeholders.username')"
        v-model="signupForm.username"
        :errors="v$.username.$errors"
      />
      <InputUi
        type="email"
        name="email"
        :placeholder="$t('placeholders.email')"
        v-model="signupForm.email"
        :errors="v$.email.$errors"
      />
      <InputUi
        type="password"
        name="password"
        :placeholder="$t('placeholders.createPassword')"
        v-model="signupForm.password"
        :errors="v$.password.$errors"
      />
      <InputUi
        type="password"
        name="password"
        :placeholder="$t('placeholders.confirmPassword')"
        v-model="signupForm.confirmPassword"
        :errors="v$.confirmPassword.$errors"
      />
      <label class="dark:text-zinc-400">{{ $t('texts.selectJob') }}</label>
      <select v-model="signupForm.jobTitle" class="dark:bg-dark-bg-black">
        <option disabled>{{ $t('texts.selectJob') }}</option>
        <option v-for="(jobTitle, index) in jobTitles" :key="index">{{ jobTitle }}</option>
      </select>
      <span
        v-for="error in v$.jobTitle.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
      >
        {{ error.$message }}
      </span>
      <ButtonUI :is-loading="isLoading">
        {{ $t('buttons.signUp') }}
      </ButtonUI>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textSignUp') }}</span>
      <router-link :to="{ name: 'login' }" class="underline text-lg dark:text-zinc-300">{{
        $t('buttons.logIn')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import useValidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { useSignup } from '../mutations/signup'
import ButtonUI from '../ui/ButtonUI.vue'
import InputUi from '../ui/InputUi.vue'
import router from '../router'
import { useAlertsStore } from '../stores/AlertsStore'

const jobTitles = [
  'BackEnd developer',
  'FrontEnd developer',
  'HR manager',
  'Office manager',
  'Project Manager',
  'Security specialist',
  'UI/UX'
]

const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  jobTitle: ''
})

const rules = computed(() => {
  return {
    username: { required, minLength: minLength(4) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs(signupForm.password) },
    jobTitle: { required }
  }
})

const v$ = useValidate(rules, signupForm)

const alertsStore = useAlertsStore()

const { mutateAsync, isLoading } = useSignup()

const signup = async (details) => {
  const result = await v$.value.$validate()
  if (result) {
    mutateAsync(details, {
      onSuccess: () => {
        router.push('/')
        alertsStore.addNotification('success', 'Your accout was successfully signed up')
      }
    })
  }
}
</script>
