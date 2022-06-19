<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import { login, forgot } from '$lib/authService'
  import { getMe } from '$lib/userService'
  import { session, page } from '$app/stores'
  import { goto } from '$app/navigation'

  let email: string
  let password: string

  let errorTitle: string
  let errorMessage: string
  let isLoggingIn: boolean

  $: redirectTo = $page.url.searchParams.get('redirectTo')

  const handleSubmit = async () => {
    isLoggingIn = true
    const [data, status] = await login(email, password)
    if (status === 'success') {
      const [data, status] = await getMe()
      if (status === 'success') {
        session.set({ user: data as User })
        await goto(redirectTo ?? '/')
      }
    } else {
      errorTitle = 'You could not be logged in'
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isLoggingIn = false
  }

  const handleForgotPassword = async () => {
    const [data, status] = await forgot(email)
    if (status === 'success') {
      alert('Check your email for a link to reset your password.')
    } else {
      errorTitle = 'We don\'t know who you are'
      errorMessage = (data as Record<string, unknown>).message as string
    }
  }
</script>

<svelte:head>
  <title>Login - Venuer</title>
</svelte:head>

<form class="mx-auto max-w-lg flex flex-col space-y-10 md:mt-6" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
    <h1 class="text-4xl font-semibold">Welcome back</h1>
    <p>If you don't have an account, <a href="/register{ redirectTo ? `?redirectTo=${redirectTo}` : '' }">click here to sign up</a>.</p>
  </div>
  {#if errorMessage}
    <Alert title={errorTitle} message={errorMessage} />
  {/if}
  <div class="space-y-6">
    <TextInput id="email" label="Email" bind:value={email} />
    <div>
      <TextInput id="password" label="Password" isPassword bind:value={password} />
      <button type="button" on:click={handleForgotPassword} class="mt-2 text-brand hover:underline">
        Forgot your password?
      </button>
      <!-- <a href="/reset-password" class="block mt-2">Forgot your password?</a> -->
    </div>
    <Button isLoading={isLoggingIn} variant='contained' size="lg">Log in</Button>
  </div>
</form>
