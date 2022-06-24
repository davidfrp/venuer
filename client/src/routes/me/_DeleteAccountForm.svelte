<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'
  import Button from '$lib/components/Button.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import { deleteMe } from '$lib/userService'
  import { logout } from '$lib/authService'
  import { goto } from '$app/navigation'
  
  export let user: User

  let isDeleting: boolean
  let confirmationText: string
  let errorMessage: string

  const handleSubmit = async () => {
    isDeleting = true
    
    const [data, status] = await deleteMe()
    
    if (status === 'success') {
      errorMessage = ''
      await logout()
      await goto('/')
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isDeleting = false
  }
</script>

<form on:submit|preventDefault={null} class="space-y-6">
  {#if errorMessage}
    <Alert title="Your account could not be deleted" message={errorMessage} />
  {/if}
  <div class="space-y-3">
    <p>Your account will be deleted, along with all personal information associated with it.</p>
    <p>This action is irreversibel and <span class="font-bold">cannot be undone</span>.</p>
  </div>
  <TextInput id="confirmationText" bind:value={confirmationText} label="To verify, type &quot;{user.name}&quot; below:" />
  <Button
    isDisabled={confirmationText !== user.name}
    on:click={handleSubmit}
    isLoading={isDeleting}
    variant="contained"
    type="button"
    size="lg"
  >
    Delete account
  </Button>
</form>
