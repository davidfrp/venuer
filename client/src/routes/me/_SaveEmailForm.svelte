<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'
  import Button from '$lib/components/Button.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import { saveMe } from '$lib/userService'

  export let onSaved: () => void
  export let email: string

  let tempEmail: string = email

  let isSaving: boolean
  let errorMessage: string

  const handleSubmit = async () => {
    isSaving = true
    
    const [data, status] = await saveMe({ email: tempEmail })
    
    if (status === 'success') {
      email = (data as User).email
      errorMessage = ''
      onSaved()
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isSaving = false
  }
</script>

{#if errorMessage}
  <Alert title="Your email could not be saved" message={errorMessage} />
{/if}

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <TextInput id="email" label="Email" bind:value={tempEmail} />
  <Button isLoading={isSaving} variant="contained" size="lg">
    Save
  </Button>
</form>
