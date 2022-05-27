<script lang="ts">
  import TextInput from '$lib/TextInput.svelte'
  import Button from '$lib/Button.svelte'
  import { session } from '$app/stores'
  import { login } from '$lib/authService'
  import { me } from '$lib/userService'
  import { goto } from '$app/navigation'

  let email: string
  let password: string

  const handleSubmit = async () => {
    const { status, message } = await login(email, password)
    if (status === 'success') {
      const { status, ...data } = await me()
      if (status === 'success') {
        session.set({ user: data as User })
        goto('/')
      }
    } else {
      alert(message)
    }
  }
</script>

<form class="flex flex-col space-y-10" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
    <h1 class="text-4xl font-semibold">Welcome back</h1>
    <p>If you don't have an account, <a href="/register">click here to sign up</a>.</p>
  </div>
  <div class="space-y-6">
    <TextInput id="email" label="Email" bind:value={email} />
    <TextInput id="password" label="Password" isPassword bind:value={password} />
    <Button variant='contained' size="lg">Log in</Button>
  </div>
</form>
