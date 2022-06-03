<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
	import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import { register } from '$lib/authService'
  import { getMe } from '$lib/userService'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let name: string
  let email: string
  let password: string

  let errorMessage: string

  const handleSubmit = async () => {
    const [data, status] = await register(name, email, password)
    if (status === 'success') {
      const [data, status] = await getMe()
      if (status === 'success') {
        session.set({ user: data as User })
        goto('/')
      }
    } else {
      errorMessage = data.message as string
    }
  }
</script>

<form class="mx-auto max-w-lg flex flex-col space-y-10" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-3">
    <h1 class="text-4xl font-semibold">Create account</h1>
    <p>If you already have an account, <a href="/login">click here to log in</a>.</p>
  </div>
  {#if errorMessage}
    <Alert title="Your account couldn't be created" message={errorMessage} />
  {/if}
  <div class="grid columns-2 gap-x-3 gap-y-6">
    <div class="col-span-2 sm:col-span-1">
      <TextInput id="name" label="Name" bind:value={name} />
    </div>
    <div class="col-span-2 sm:col-span-1">
      <TextInput id="email" label="Email" bind:value={email} />
    </div>
    <div class="col-span-2">
      <TextInput id="password" label="Password" isPassword bind:value={password} />
    </div>
    <div class="col-span-2">
      <Button variant="contained" size="lg">Create account</Button>
    </div>
  </div>
</form>
