<script lang="ts">
	import Button from '$lib/Button.svelte'
  import TextInput from '$lib/TextInput.svelte'
  import { register } from '$lib/authService'
  import { me } from '$lib/userService'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  let name: string
  let email: string
  let password: string

  const handleSubmit = async () => {
    const { status, message } = await register(name, email, password)
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
    <h1 class="text-4xl font-semibold">Create account</h1>
    <p>If you already have an account, <a href="/login">click here to log in</a>.</p>
  </div>
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
