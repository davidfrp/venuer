<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import { login } from '$lib/authService'
  import { getMe } from '$lib/userService'
  import { session, page } from '$app/stores'
  import { goto } from '$app/navigation'

  // TODO Remove default values
  let email: string = 'davidfrp@outlook.dk'
  let password: string = '12345678Aa'

  let errorMessage: string

  $: redirectTo = $page.url.searchParams.get('redirectTo')

  const handleSubmit = async () => {
    const [data, status] = await login(email, password)
    if (status === 'success') {
      const [data, status] = await getMe()
      if (status === 'success') {
        session.set({
          user: {
            id: data._id as string,
            role: data.role as number
          }
        })
        goto(redirectTo ?? '/')
      }
    } else {
      errorMessage = data.message as string
    }
  }
</script>

<form class="mx-auto max-w-lg flex flex-col space-y-10" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
    <h1 class="text-4xl font-semibold">Welcome back</h1>
    <p>If you don't have an account, <a href="/register{ redirectTo ? `?redirectTo=${redirectTo}` : '' }">click here to sign up</a>.</p>
  </div>
  {#if errorMessage}
    <Alert title="You could not be logged in" message={errorMessage} />
  {/if}
  <div class="space-y-6">
    <TextInput id="email" label="Email" bind:value={email} />
    <TextInput id="password" label="Password" isPassword bind:value={password} />
    <Button variant='contained' size="lg">Log in</Button>
  </div>
</form>
