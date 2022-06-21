<script lang="ts">
  import ForgotPasswordForm from '../_ForgotPasswordForm.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { logout } from '$lib/authService'
  import { browser } from '$app/env'
  import { saveMe } from '$lib/userService'
  import dayjs from 'dayjs'

  export let user: User

  let tempUser: User = {} as User
  let errorMessage: string
  let isForgotModalShown: boolean
  let isSaving: boolean

  let daysSincePasswordChange = dayjs().diff(user.lastPasswordChangedAt, 'day')

  if (browser) {
    tempUser = structuredClone(user)
  }

  const handleSubmit = async () => {
    isSaving = true
    
    const [data, status] = await saveMe({
      name: tempUser.name,
      email: tempUser.email
    })
    
    if (status === 'success') {
      user = data as User
      errorMessage = ''
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isSaving = false
  }
  
  const handleForgot = () => {
    isForgotModalShown = true
  }
</script>

<!-- <code class="whitespace-pre-wrap">{JSON.stringify(user, null, 2)}</code> -->
<div class="space-y-10">
  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">You about yourself</h2>
    <p>Change personal details such as your name and email.</p>
  </div>
  <div class="divide-y">
    <div class="pb-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Name</span>
        <span class="truncate text-sm text-gray-500">
          {user.name}
        </span>
      </div>
      <Button variant="text">Change</Button>
    </div>
    <div class="py-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Email</span>
        <span class="truncate text-sm text-gray-500">
          {user.email}
        </span>
      </div>
      <Button variant="text">Change</Button>
    </div>
  </div>
  <!-- <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    {#if errorMessage}
      <Alert title="Your user details could not be saved" message={errorMessage} />
    {/if}
    <TextInput id="name" label="Name" bind:value={tempUser.name} />
    <TextInput id="email" label="Email" bind:value={tempUser.email} />
    <Button isLoading={isSaving} variant="contained" size="lg">Save name and email</Button>
  </form> -->
  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">Login & security</h2>
  </div>
  <div class="divide-y">
    <div class="pb-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Password</span>
        <span class="truncate text-sm text-gray-500">
          Last updated {
            daysSincePasswordChange > 0 ? (
              daysSincePasswordChange > 1 ? `${daysSincePasswordChange} days ago` : 'yesterday'
            ) : 'today'
          }
        </span>
      </div>
      <Button variant="text" on:click={handleForgot}>Change</Button>
    </div>
    <div class="py-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Log out of venuer</span>
      </div>
      <Button variant="text" on:click={logout}>Log out</Button>
    </div>
  </div>
</div>

<Modal title="Reset password" isOpen={isForgotModalShown} onRequestClose={() => isForgotModalShown = false}>
  <ForgotPasswordForm email={user.email} />
</Modal>
