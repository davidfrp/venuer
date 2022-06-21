<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import { page } from '$app/stores'
import Button from '$lib/components/Button.svelte'

  export let email: string | undefined = undefined

  let newPassword: string
  let verificationCode: string | null = $page.url.searchParams.get('code')

  const handleSubmit = () => {
    
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if verificationCode}
    <TextInput id="newPassword" label="New password" bind:value={newPassword} />
    <Button variant="contained" size="lg">Set new password</Button>
  {:else}
    {#if email}
      <p>An email has been sent to <strong>{email}</strong> with a verification code to change your password.</p>
      <p>You'll need to enter the verification code below to change your password.</p>
    {:else}
      <p>Enter your email address below. If it's registered with us, we will send instructions to get a new password.</p>
      <TextInput id="email" label="Email" bind:value={email} />
    {/if}
  {/if}
</form>